import React from 'react';
import { Target, Clock, Volume2, VolumeX, BookOpen, Trophy } from 'lucide-react';

interface NavbarProps {
  timeRemainingSeconds: number;
  timerActive: boolean;
  onToggleTimer: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  totalScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  timeRemainingSeconds,
  timerActive,
  onToggleTimer,
  soundEnabled,
  onToggleSound,
  onOpenGuide,
  totalScore,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Target className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                Cabaran Matlamat <span className="text-orange-600">SMART</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                🇲🇾 Edisi Malaysia
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Pencapaian Harian, Simpanan, Beli Kereta & Kerjaya (Bawah 15 Minit)
            </p>
          </div>
        </div>

        {/* Status and Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-950 font-bold text-sm">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span>{totalScore} <span className="text-xs font-medium text-orange-700">mata</span></span>
          </div>

          {/* 15-Minute Target Timer */}
          <button
            onClick={onToggleTimer}
            title={timerActive ? 'Jeda pemasa 15 minit' : 'Sambung pemasa'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <Clock className={`w-3.5 h-3.5 ${timerActive ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
            <span>{formatTime(timeRemainingSeconds)}</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan kesan bunyi' : 'Hidupkan kesan bunyi'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Tukar Bunyi"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* SMART Guide button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Panduan SMART</span>
            <span className="md:hidden">Panduan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
