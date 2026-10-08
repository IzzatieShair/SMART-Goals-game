import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Target,
  Copy,
  Check,
  Medal,
  Layers,
  ArrowUp,
  Gamepad2
} from 'lucide-react';
import { ChallengeQuestion, Player, GamePack } from '../data/challenges';
import { UserAnswerRecord } from './ChallengeSection';

interface ScoreboardSectionProps {
  currentPack: GamePack;
  challenges: ChallengeQuestion[];
  answers: Record<string, UserAnswerRecord>;
  mode: 'solo' | 'group';
  soloPlayerName: string;
  groupPlayers: Player[];
  timeRemainingSeconds: number;
  totalTimeSpentSeconds: number;
  onResetGame: () => void;
  onBackToGameSurfaceAndChoose: () => void;
}

export const ScoreboardSection: React.FC<ScoreboardSectionProps> = ({
  currentPack,
  challenges,
  answers,
  mode,
  soloPlayerName,
  groupPlayers,
  timeRemainingSeconds,
  totalTimeSpentSeconds,
  onResetGame,
  onBackToGameSurfaceAndChoose,
}) => {
  const [copied, setCopied] = useState(false);

  const totalQuestions = challenges.length;
  const answeredCount = Object.keys(answers).length;
  const isFinished = answeredCount >= totalQuestions && totalQuestions > 0;

  let correctCount = 0;
  Object.values(answers).forEach((ans) => {
    if (ans.isCorrect) correctCount++;
  });

  const totalScore = correctCount * 100;
  const maxScore = totalQuestions * 100;
  const accuracyPercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Format durasi masa
  const formatMinutesSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  // Skor kumpulan
  const groupScores = groupPlayers.map((player) => {
    let pCorrect = 0;
    let pAnswered = 0;
    Object.values(answers).forEach((ans) => {
      if (ans.answeredByPlayerId === player.id) {
        pAnswered++;
        if (ans.isCorrect) pCorrect++;
      }
    });
    return {
      player,
      correct: pCorrect,
      answered: pAnswered,
      points: pCorrect * 100,
    };
  }).sort((a, b) => b.points - a.points);

  // Ulasan pencapaian solo
  const getSoloResultMessage = () => {
    if (!isFinished) {
      return {
        badge: '🎯 Cabaran Sedang Berjalan',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        title: 'Selesaikan semua soalan di atas!',
        text: `Anda telah menjawab ${answeredCount} daripada ${totalQuestions} soalan cabaran. Pilih jawapan di Bahagian 2 untuk melengkapkan penilaian pencapaian anda.`,
      };
    }

    if (accuracyPercentage === 100) {
      return {
        badge: '🏆 Pakar Strategi SMART (Cemerlang)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        title: 'Markah Penuh! Bersedia Capai Impian Sebenar',
        text: 'Tahniah luar biasa! Anda sangat mahir menukar angan-angan kosong kepada sasaran hidup yang berdisiplin, terukur, dan realistik sama ada untuk simpanan wang, beli kereta pertama, mahupun memohon kerja impian!',
      };
    } else if (accuracyPercentage >= 60) {
      return {
        badge: '⚡ Pencapai Matlamat Berpotensi (Sangat Baik)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        title: 'Pemahaman SMART Yang Mantap!',
        text: 'Syabas! Anda berjaya mengenal pasti kriteria penting seperti angka tepat dan tarikh akhir. Teruskan amalan ini dalam pengurusan bajet bulanan dan permohonan kerjaya anda.',
      };
    } else {
      return {
        badge: '🌱 Sedang Berkembang (Teruskan Usaha)',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        title: 'Percubaan Yang Bagus! Latihan Mengasah Kemahiran',
        text: 'Permulaan yang baik! Ingat kunci utama SMART: sentiasa sertakan angka yang boleh diukur (seperti RM dan kuantiti) serta tarikh tamat yang jelas supaya matlamat tidak tinggal impian semata-mata.',
      };
    }
  };

  const soloResult = getSoloResultMessage();

  // Salin rumusan ke papan keratan
  const handleCopySummary = async () => {
    const textToCopy = `🎯 Cabaran Matlamat SMART (Edisi Malaysia)
Kategori: ${currentPack.title}
Pemain: ${mode === 'solo' ? soloPlayerName || 'Pemain Solo' : 'Permainan Kumpulan'}
Mata: ${totalScore} / ${maxScore} mata (${accuracyPercentage}% ketepatan)
Masa Selesai: ${formatMinutesSeconds(totalTimeSpentSeconds)} (Sasaran: < 15 minit)
Status: ${isFinished ? 'Selesai Sepenuhnya 🎉' : 'Sedang Berjalan'}
Amalan SMART: Pastikan matlamat Khusus, Boleh Diukur, Boleh Dicapai, Relevan & Terikat Masa!`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="scoreboard"
      className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-6 sm:p-8 transition-all relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/40 via-amber-100/20 to-transparent -z-10 rounded-bl-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            BAHAGIAN 3 DARI 3 • PAPAN SKOR & HASIL KEPUTUSAN
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Penjejakan Skor & Keputusan Akhir
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Semak jumlah mata terkumpul, ketepatan jawapan, dan rumusan penguasaan matlamat harian anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Rumusan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Key Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Jumlah Mata */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-orange-800">Jumlah Mata</span>
            <Trophy className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalScore}
            <span className="text-xs font-bold text-slate-400 ml-1">/ {maxScore}</span>
          </div>
          <div className="text-xs text-orange-900/80 font-semibold mt-1">
            +100 mata setiap jawapan betul
          </div>
        </div>

        {/* Jawapan Betul */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-emerald-800">Jawapan Betul</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {correctCount}
            <span className="text-xs font-bold text-slate-400 ml-1">/ {totalQuestions}</span>
          </div>
          <div className="text-xs text-emerald-900/80 font-semibold mt-1">
            {accuracyPercentage}% kadar ketepatan
          </div>
        </div>

        {/* Kemajuan Soalan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-indigo-800">Kemajuan</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {answeredCount}
            <span className="text-xs font-bold text-slate-400 ml-1">/ {totalQuestions}</span>
          </div>
          <div className="text-xs text-indigo-900/80 font-semibold mt-1">
            {isFinished ? '100% Selesai 🎉' : 'Sedang Berjalan'}
          </div>
        </div>

        {/* Masa Digunakan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-700">Masa Bermain</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {formatMinutesSeconds(totalTimeSpentSeconds)}
          </div>
          <div className="text-xs text-slate-600 font-medium mt-1">
            ⏱️ Sasaran &lt; 15 minit
          </div>
        </div>
      </div>

      {/* Mode-Specific Results & Leaderboard */}
      {mode === 'solo' ? (
        /* KEPUTUSAN PEMAIN SOLO */
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200 mb-8 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-sm">
                🎓
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pencapaian Pemain
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {soloPlayerName || 'Pemain Solo'}
                </h3>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${soloResult.badgeColor}`}>
              <Sparkles className="w-4 h-4" />
              <span>{soloResult.badge}</span>
            </div>
          </div>

          <div>
            <h4 className="text-base font-extrabold text-slate-900 mb-1">
              {soloResult.title}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {soloResult.text}
            </p>
          </div>

          {/* Senarai Semak Prinsip SMART */}
          <div className="pt-3 border-t border-slate-200/70">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Prinsip SMART Yang Dipelajari Dalam Permainan Ini:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { letter: 'S', title: 'Khusus (Specific)', desc: 'Sasaran simpanan deposit kereta / hantar resume' },
                { letter: 'M', title: 'Boleh Diukur (Measurable)', desc: 'Ada angka tepat (RM350/bln, 5 resume seminggu)' },
                { letter: 'A', title: 'Boleh Dicapai (Achievable)', desc: 'Realistik & seimbang dengan rutin harian' },
                { letter: 'R', title: 'Relevan (Relevant)', desc: 'Kesan nyata kepada skor CCRIS & kerjaya' },
                { letter: 'T', title: 'Terikat Masa (Time-bound)', desc: 'Tarikh akhir (31 Ogos, 12 bulan) beri disiplin' },
              ].map((item) => (
                <div
                  key={item.letter}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs">
                      {item.letter}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs">{item.title}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* KEPUTUSAN KUMPULAN & PODIUM */
        <div className="p-6 sm:p-7 rounded-3xl bg-indigo-50/50 border border-indigo-200/90 mb-8 space-y-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-200/60">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-indigo-900 tracking-wider">
                <Medal className="w-4 h-4 text-amber-500" />
                Kedudukan Giliran Pemain Kumpulan
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Papan Juara Kumpulan
              </h3>
            </div>

            <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-900">
              👥 {groupPlayers.length} Pemain Bergilir
            </div>
          </div>

          {/* Podium Kumpulan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {groupScores.map((entry, rank) => {
              const medals = ['🥇 Tempat Pertama', '🥈 Tempat Kedua', '🥉 Tempat Ketiga', 'Tempat Keempat'];
              const borderStyles = [
                'border-amber-400 bg-amber-50/80 shadow-xs',
                'border-slate-300 bg-white shadow-2xs',
                'border-orange-300 bg-white shadow-2xs',
                'border-slate-200 bg-white'
              ];

              return (
                <div
                  key={entry.player.id}
                  className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all ${borderStyles[rank] || 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-600">
                      {medals[rank] || `Tempat Ke-${rank + 1}`}
                    </span>
                    <span className="text-xl">{entry.player.avatar}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {entry.player.name}
                    </h4>
                    <div className="text-2xl font-black text-indigo-950 mt-1">
                      {entry.points} <span className="text-xs font-bold text-slate-400">mata</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 flex items-center justify-between">
                    <span>{entry.correct} betul</span>
                    <span>{entry.answered} giliran</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-indigo-200/80 text-xs text-indigo-950 flex items-center justify-between gap-3">
            <span className="font-medium">
              🎉 <strong className="font-bold">Ulasan kumpulan:</strong> Kerjasama dan giliran yang cemerlang! Membincangkan matlamat SMART bersama rakan mengukuhkan perancangan hidup sebenar.
            </span>
            <span className="font-extrabold text-indigo-700 shrink-0">
              Jumlah Kumpulan: {totalScore} mata
            </span>
          </div>
        </div>
      )}

      {/* PROMINENT BUTTON REQUIRED: Back to game surface after finishing & choose another game! */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-xs text-white">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Pilihan Permainan Baru Sedia Dimainkan!</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight">
            Ingin cuba tema pencapaian harian yang lain?
          </h3>
          <p className="text-xs sm:text-sm text-white/90 font-medium">
            Kembali ke permukaan utama untuk memilih kategori seperti Simpanan, Beli Kereta, Cari Kerja, atau Kesihatan.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToGameSurfaceAndChoose}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shrink-0"
        >
          <ArrowUp className="w-4 h-4 text-orange-600 stroke-[3]" />
          <span>🎮 Kembali ke Permukaan & Pilih Permainan Lain</span>
        </button>
      </div>

      {/* Scoreboard Actions Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          💡 Semua jawapan dan mata direkodkan serta-merta pada skrin ini tanpa perlu memuat semula halaman.
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onResetGame}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mula Semula Kategori Ini</span>
          </button>

          <button
            type="button"
            onClick={onBackToGameSurfaceAndChoose}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Pilih Tema Lain ↑</span>
          </button>
        </div>
      </div>
    </section>
  );
};
