/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SmartGuideModal } from './components/SmartGuideModal';
import { GameSetupSection } from './components/GameSetupSection';
import { ChallengeSection, UserAnswerRecord } from './components/ChallengeSection';
import { ScoreboardSection } from './components/ScoreboardSection';
import {
  GAME_PACKS,
  DEFAULT_GROUP_PLAYERS,
  Player,
  GamePack
} from './data/challenges';
import { sound } from './utils/sound';
import { Target, Sparkles, ChevronDown } from 'lucide-react';

export default function App() {
  // Game Packs: Pek 1 (Kewangan & Kereta), Pek 2 (Kerjaya), Pek 3 (Kehidupan & Kesihatan)
  const [selectedPackId, setSelectedPackId] = useState<string>('pack-finance');

  const currentPack: GamePack =
    GAME_PACKS.find((p) => p.id === selectedPackId) || GAME_PACKS[0];

  const activeChallenges = currentPack.challenges;

  // Mod: 'solo' atau 'group'
  const [mode, setMode] = useState<'solo' | 'group'>('solo');

  // Tetapan pemain solo
  const [soloPlayerName, setSoloPlayerName] = useState<string>('Farah (Mahasiswa)');

  // Tetapan kumpulan
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [groupPlayers, setGroupPlayers] = useState<Player[]>(DEFAULT_GROUP_PLAYERS);

  // Rekod jawapan
  const [answers, setAnswers] = useState<Record<string, UserAnswerRecord>>({});

  // Indeks giliran aktif dalam mod kumpulan
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);

  // Pemasa 15 minit (900 saat)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(900);
  const [totalTimeSpentSeconds, setTotalTimeSpentSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Kesan audio
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modal panduan SMART
  const [guideOpen, setGuideOpen] = useState<boolean>(false);

  // Status permainan dimulakan
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Kiraan masa pemasa
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
      setTotalTimeSpentSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  // Suis audio
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.enabled = nextVal;
  };

  // Tukar pek permainan / kategori
  const handleSelectPack = (packId: string) => {
    sound.playClick();
    setSelectedPackId(packId);
    setAnswers({});
    setActivePlayerIndex(0);
    setGameStarted(true);
  };

  // Tukar mod
  const handleModeChange = (newMode: 'solo' | 'group') => {
    setMode(newMode);
    sound.playClick();
  };

  // Kemaskini nama pemain kumpulan
  const handleUpdateGroupPlayerName = (id: string, name: string) => {
    setGroupPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  // Tukar bilangan pemain kumpulan
  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    if (count > groupPlayers.length) {
      const extraAvatars = ['🌟', '🎯', '💡', '🚀'];
      const extraColors = [
        'from-purple-500 to-indigo-600',
        'from-pink-500 to-rose-600'
      ];
      const newPlayer: Player = {
        id: `p${count}`,
        name: `Pemain ${count}`,
        avatar: extraAvatars[count - 1] || '🎓',
        color: extraColors[(count - 1) % extraColors.length] || 'from-blue-500 to-indigo-600'
      };
      setGroupPlayers((prev) => [...prev, newPlayer]);
    }
  };

  // Jumlah skor semasa
  const totalScore = Object.values(answers).reduce((acc, curr) => {
    return acc + (curr.isCorrect ? 100 : 0);
  }, 0);

  // Memilih jawapan (Ciri 1: Maklum balas segera, Ciri 2: Giliran kumpulan)
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    const targetChallenge = activeChallenges.find((c) => c.id === questionId);
    if (!targetChallenge) return;

    const isCorrect = targetChallenge.correctOptionId === optionId;

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    const currentActivePlayers = groupPlayers.slice(0, playerCount);
    const assignedPlayer =
      mode === 'group'
        ? currentActivePlayers[activePlayerIndex % currentActivePlayers.length]
        : null;

    const newRecord: UserAnswerRecord = {
      questionId,
      selectedOptionId: optionId,
      isCorrect,
      answeredByPlayerId: mode === 'group' ? assignedPlayer?.id : 'solo',
      answeredByPlayerName: mode === 'group' ? assignedPlayer?.name : soloPlayerName,
    };

    setAnswers((prev) => {
      const next = { ...prev, [questionId]: newRecord };

      if (Object.keys(next).length === activeChallenges.length) {
        sound.playVictory();
      }

      return next;
    });

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (mode === 'group') {
      setActivePlayerIndex((prev) => (prev + 1) % currentActivePlayers.length);
    }
  };

  // Mula atau mula semula
  const handleStartOrRestart = () => {
    sound.playClick();
    setAnswers({});
    setTimeRemainingSeconds(900);
    setTotalTimeSpentSeconds(0);
    setTimerActive(true);
    setActivePlayerIndex(0);
    setGameStarted(true);

    const el = document.getElementById('smart-challenge');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset kategori semasa
  const handleResetGame = () => {
    sound.playClick();
    setAnswers({});
    setTimeRemainingSeconds(900);
    setTotalTimeSpentSeconds(0);
    setActivePlayerIndex(0);
  };

  // Permintaan Khas: "button to back at the game surface after finish the game and can choose another games"
  const handleBackToGameSurfaceAndChoose = () => {
    sound.playClick();
    const setupEl = document.getElementById('game-setup');
    if (setupEl) {
      setupEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToChallenge = () => {
    const el = document.getElementById('smart-challenge');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToScoreboard = () => {
    const el = document.getElementById('scoreboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-200 selection:text-amber-950">
      {/* Sticky App Header */}
      <Navbar
        timeRemainingSeconds={timeRemainingSeconds}
        timerActive={timerActive}
        onToggleTimer={() => setTimerActive((prev) => !prev)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setGuideOpen(true)}
        totalScore={totalScore}
      />

      {/* Main Single-Page Container with ALL 3 SECTIONS STACKED DOWN ONE SCREEN */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-8">
        {/* Welcome Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sprint 15 Minit: Pencapaian Kehidupan Harian & Kerjaya di Malaysia 🇲🇾</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Kuasai Matlamat SMART Melalui Permainan Santai
            </h1>

            <p className="text-sm sm:text-base font-medium text-amber-50 leading-relaxed max-w-2xl">
              Ubah angan-angan kosong seperti <span className="underline decoration-amber-300 font-semibold italic">"nak kumpul duit beli kereta"</span> atau <span className="underline decoration-amber-300 font-semibold italic">"nak dapat kerja gaji elok"</span> menjadi pelan tindakan Khusus, Boleh Diukur, Boleh Dicapai, Relevan dan Terikat Masa!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              <span className="px-3 py-1 rounded-xl bg-black/20 backdrop-blur-xs border border-white/20">
                ⚡ 1. Persediaan Permainan
              </span>
              <span className="px-3 py-1 rounded-xl bg-black/20 backdrop-blur-xs border border-white/20">
                🎯 2. Cabaran SMART
              </span>
              <span className="px-3 py-1 rounded-xl bg-black/20 backdrop-blur-xs border border-white/20">
                🏆 3. Papan Skor
              </span>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-15 hidden lg:block text-white">
            <Target className="w-48 h-48 stroke-[1]" />
          </div>
        </div>

        {/* BAHAGIAN 1: PERSEDIAAN PERMAINAN (Game Setup) */}
        <GameSetupSection
          gamePacks={GAME_PACKS}
          selectedPackId={selectedPackId}
          onSelectPack={handleSelectPack}
          mode={mode}
          onModeChange={handleModeChange}
          soloPlayerName={soloPlayerName}
          onSoloPlayerNameChange={setSoloPlayerName}
          groupPlayers={groupPlayers}
          onUpdateGroupPlayerName={handleUpdateGroupPlayerName}
          playerCount={playerCount}
          onPlayerCountChange={handlePlayerCountChange}
          onStartOrRestart={handleStartOrRestart}
          gameStarted={gameStarted}
          onScrollToChallenge={scrollToChallenge}
        />

        {/* BAHAGIAN 2: CABARAN SMART (SMART Challenge - Prompts Sentiasa Terpapar Sejak Awal) */}
        <ChallengeSection
          currentPack={currentPack}
          challenges={activeChallenges}
          answers={answers}
          onSelectAnswer={handleSelectAnswer}
          mode={mode}
          soloPlayerName={soloPlayerName}
          groupPlayers={groupPlayers.slice(0, playerCount)}
          activePlayerIndex={activePlayerIndex}
          onOpenGuide={() => setGuideOpen(true)}
          onScrollToScoreboard={scrollToScoreboard}
          onChangePackPrompt={handleBackToGameSurfaceAndChoose}
        />

        {/* BAHAGIAN 3: PAPAN SKOR & KEPUTUSAN (Scoreboard + Butang Kembali ke Permukaan & Pilih Permainan Lain) */}
        <ScoreboardSection
          currentPack={currentPack}
          challenges={activeChallenges}
          answers={answers}
          mode={mode}
          soloPlayerName={soloPlayerName}
          groupPlayers={groupPlayers.slice(0, playerCount)}
          timeRemainingSeconds={timeRemainingSeconds}
          totalTimeSpentSeconds={totalTimeSpentSeconds}
          onResetGame={handleResetGame}
          onBackToGameSurfaceAndChoose={handleBackToGameSurfaceAndChoose}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Cabaran Matlamat SMART</span>
            <span>•</span>
            <span>Edisi Kehidupan Harian, Simpanan, Beli Kereta & Kerjaya Malaysia</span>
          </div>
          <div className="text-slate-400">
            Ketiga-tiga bahagian permainan tersusun pada satu skrin • Masa bermain di bawah 15 minit
          </div>
        </div>
      </footer>

      {/* SMART Framework Quick Reference Modal */}
      <SmartGuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
