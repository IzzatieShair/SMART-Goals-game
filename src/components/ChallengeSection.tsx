import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  User,
  Users,
  Layers
} from 'lucide-react';
import { ChallengeQuestion, Player, GamePack } from '../data/challenges';

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  answeredByPlayerId?: string;
  answeredByPlayerName?: string;
}

interface ChallengeSectionProps {
  currentPack: GamePack;
  challenges: ChallengeQuestion[];
  answers: Record<string, UserAnswerRecord>;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  mode: 'solo' | 'group';
  soloPlayerName: string;
  groupPlayers: Player[];
  activePlayerIndex: number;
  onOpenGuide: () => void;
  onScrollToScoreboard: () => void;
  onChangePackPrompt: () => void;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  currentPack,
  challenges,
  answers,
  onSelectAnswer,
  mode,
  soloPlayerName,
  groupPlayers,
  activePlayerIndex,
  onOpenGuide,
  onScrollToScoreboard,
  onChangePackPrompt,
}) => {
  // Giliran pemain untuk soalan dalam mod kumpulan
  const getAssignedPlayerForIndex = (index: number): Player => {
    return groupPlayers[index % groupPlayers.length];
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount >= challenges.length && challenges.length > 0;

  return (
    <section
      id="smart-challenge"
      className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-6 sm:p-8 transition-all relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-50/50 via-emerald-50/30 to-transparent -z-10 rounded-full blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            BAHAGIAN 2 DARI 3 • CABARAN SMART
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>{currentPack.icon}</span>
            <span>{currentPack.title}</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Baca setiap situasi kehidupan harian di Malaysia di bawah, semak matlamat yang samar, dan pilih pembetulan SMART. Maklum balas dan mata akan dipaparkan serta-merta!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onChangePackPrompt}
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tukar Kategori Lain ↑</span>
          </button>
        </div>
      </div>

      {/* Active Turn Banner */}
      <div className="mb-6 p-4 rounded-2xl border transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {mode === 'solo' ? '👤' : groupPlayers[activePlayerIndex]?.avatar || '👥'}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-800">
              {mode === 'solo' ? 'Pemain Semasa' : 'Giliran Menjawab: Sedia!'}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900">
              {mode === 'solo' ? (
                <span>{soloPlayerName || 'Pemain Solo'}</span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-indigo-700 underline decoration-indigo-300">
                    {groupPlayers[activePlayerIndex]?.name || `Pemain ${activePlayerIndex + 1}`}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Pemain {(activePlayerIndex % groupPlayers.length) + 1} dari {groupPlayers.length}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 bg-white/80 px-3.5 py-2 rounded-xl border border-orange-200/70">
          <span>Kemajuan:</span>
          <span className="text-orange-600 font-extrabold">
            {answeredCount} daripada {challenges.length} Selesai
          </span>
          <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${challenges.length > 0 ? (answeredCount / challenges.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prompts Stack (Sentiasa terpapar di skrin sejak awal) */}
      <div className="space-y-6">
        {challenges.map((challenge, index) => {
          const currentAnswer = answers[challenge.id];
          const hasAnswered = !!currentAnswer;
          const assignedPlayer = mode === 'group' ? getAssignedPlayerForIndex(index) : null;
          const isThisTurn = mode === 'group' && !hasAnswered && index === activePlayerIndex;

          return (
            <div
              key={challenge.id}
              id={`challenge-card-${challenge.id}`}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all relative ${
                hasAnswered
                  ? currentAnswer.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/20'
                  : isThisTurn
                  ? 'border-orange-400 bg-white shadow-md ring-2 ring-orange-300/50'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Card Meta & Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    {challenge.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                    {challenge.tag}
                  </span>
                </div>

                {/* Turn / Solver Badge */}
                {mode === 'group' && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-900">
                    <span>{assignedPlayer?.avatar}</span>
                    <span>
                      {hasAnswered
                        ? `Dijawab oleh ${currentAnswer.answeredByPlayerName}`
                        : `Giliran: ${assignedPlayer?.name}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Scenario Narrative */}
              <div className="mb-4">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {challenge.scenario}
                </p>
                
                {/* Vague Goal Callout */}
                <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <span className="text-slate-400 font-serif text-lg leading-none">“</span>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                      Matlamat Asal Yang Samar:
                    </span>
                    <span className="text-sm font-semibold text-slate-900 italic">
                      {challenge.vagueGoal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{challenge.question}</span>
                </h4>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 mb-4">
                {challenge.options.map((option, optIdx) => {
                  const isSelected = currentAnswer?.selectedOptionId === option.id;
                  const isCorrectOption = challenge.correctOptionId === option.id;
                  
                  let optionStyles = 'border-slate-200 bg-slate-50/70 hover:bg-orange-50/60 hover:border-orange-300 text-slate-800';

                  if (hasAnswered) {
                    if (isSelected && currentAnswer.isCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-100/90 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-300';
                    } else if (isSelected && !currentAnswer.isCorrect) {
                      optionStyles = 'border-rose-500 bg-rose-100/90 text-rose-950 font-bold shadow-xs ring-2 ring-rose-300';
                    } else if (isCorrectOption) {
                      optionStyles = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold border-dashed';
                    } else {
                      optionStyles = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                    }
                  }

                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onSelectAnswer(challenge.id, option.id)}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? currentAnswer.isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : hasAnswered && isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700 shadow-2xs'
                      }`}>
                        {letter}
                      </span>
                      
                      <span className="flex-1 text-xs sm:text-sm leading-relaxed">
                        {option.text}
                      </span>

                      {/* Icon indicator */}
                      {hasAnswered && (
                        <span className="shrink-0 mt-0.5">
                          {isSelected && currentAnswer.isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                          {isSelected && !currentAnswer.isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                          {!isSelected && isCorrectOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback Box (Ciri 1: Maklum balas serta-merta) */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                    currentAnswer.isCorrect
                      ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
                      : 'bg-rose-100/70 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {currentAnswer.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                          <span className="font-extrabold text-sm sm:text-base text-emerald-900">
                            Tepat & Betul! +100 Mata
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-700" />
                          <span className="font-extrabold text-sm sm:text-base text-rose-900">
                            Kurang Tepat! +0 Mata
                          </span>
                        </>
                      )}
                    </div>

                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200 text-slate-800 shadow-2xs">
                      Fokus SMART: {challenge.smartFocus}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium leading-relaxed mt-1 text-slate-800">
                    {challenge.explanation}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-600">
                      💡 Pengajaran: {challenge.tip}
                    </span>

                    {mode === 'group' && currentAnswer.answeredByPlayerName && (
                      <span className="font-bold text-indigo-900 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-200">
                        Disimpan untuk {currentAnswer.answeredByPlayerName}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer navigation */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
          {allAnswered ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Semua soalan telah dijawab! Semak jumlah mata dan ulasan di Bahagian 3 di bawah.
            </span>
          ) : (
            <span>
              💡 Klik mana-mana pilihan di atas untuk melihat maklum balas pantas dan mengira mata anda.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onScrollToScoreboard}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <span>Lihat Papan Skor ↓</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
