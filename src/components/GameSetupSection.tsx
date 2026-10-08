import React from 'react';
import { Users, User, Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Player, GamePack } from '../data/challenges';

interface GameSetupSectionProps {
  gamePacks: GamePack[];
  selectedPackId: string;
  onSelectPack: (packId: string) => void;
  mode: 'solo' | 'group';
  onModeChange: (mode: 'solo' | 'group') => void;
  soloPlayerName: string;
  onSoloPlayerNameChange: (name: string) => void;
  groupPlayers: Player[];
  onUpdateGroupPlayerName: (id: string, name: string) => void;
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onStartOrRestart: () => void;
  gameStarted: boolean;
  onScrollToChallenge: () => void;
}

export const GameSetupSection: React.FC<GameSetupSectionProps> = ({
  gamePacks,
  selectedPackId,
  onSelectPack,
  mode,
  onModeChange,
  soloPlayerName,
  onSoloPlayerNameChange,
  groupPlayers,
  onUpdateGroupPlayerName,
  playerCount,
  onPlayerCountChange,
  onStartOrRestart,
  gameStarted,
  onScrollToChallenge,
}) => {
  return (
    <section id="game-setup" className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-6 sm:p-8 transition-all relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100/50 via-orange-100/30 to-transparent -z-10 rounded-bl-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            BAHAGIAN 1 DARI 3 • PERSEDIAAN PERMAINAN
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilih Tema & Mod Permainan
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Pilih kategori cabaran harian (simpanan wang, beli kereta, cari kerja), pilih mod solo atau berkumpulan, dan mulakan sekarang!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            ⚡ Tamat Dalam &lt; 15 Minit
          </span>
        </div>
      </div>

      {/* Game Pack Selector (Pilih Kategori Permainan / Pek Cabaran) */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950 mb-2.5">
          <Layers className="w-4 h-4 text-orange-600" />
          <span>Pilih Kategori Pencapaian Harian:</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {gamePacks.map((pack) => {
            const isSelected = pack.id === selectedPackId;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => onSelectPack(pack.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-white shadow-sm ring-2 ring-orange-400/40'
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{pack.icon}</span>
                  {isSelected && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300">
                      Dipilih ✓
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {pack.title}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                    {pack.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mode Selector & Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Pilih Mod Pemain:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onModeChange('solo')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 font-bold text-left transition-all cursor-pointer ${
                  mode === 'solo'
                    ? 'border-orange-500 bg-orange-50/80 text-orange-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                  mode === 'solo' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold">Pemain Solo</div>
                  <div className="text-xs font-medium text-slate-500">Cabaran individu</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onModeChange('group')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 font-bold text-left transition-all cursor-pointer ${
                  mode === 'group'
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                  mode === 'group' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold">Berkumpulan</div>
                  <div className="text-xs font-medium text-slate-500">Bergilir di skrin sama</div>
                </div>
              </button>
            </div>
          </div>

          {/* Player details based on mode */}
          {mode === 'solo' ? (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
              <label htmlFor="solo-player-name" className="block text-xs font-bold text-amber-900">
                Nama Pemain (Anda):
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <input
                  id="solo-player-name"
                  type="text"
                  value={soloPlayerName}
                  onChange={(e) => onSoloPlayerNameChange(e.target.value)}
                  placeholder="Contoh: Afiq, Farah, atau Wei Ming"
                  maxLength={25}
                  className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl bg-white border border-amber-300 focus:outline-hidden focus:ring-2 focus:ring-orange-400 text-slate-800"
                />
              </div>
              <p className="text-xs text-amber-800/80 font-medium">
                Mata dan laporan pencapaian SMART anda akan dipaparkan secara langsung di Papan Skor di bawah.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-indigo-950">
                  Nama Ahli Kumpulan (Bergilir pada 1 Skrin):
                </label>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <span>Bilangan:</span>
                  {[2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => onPlayerCountChange(count)}
                      className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                        playerCount === count
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {groupPlayers.slice(0, playerCount).map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs">
                    <span className="text-lg">{p.avatar}</span>
                    <span className="text-xs font-bold text-slate-400 min-w-[55px]">
                      Pemain {idx + 1}:
                    </span>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => onUpdateGroupPlayerName(p.id, e.target.value)}
                      placeholder={`Pemain ${idx + 1}`}
                      maxLength={18}
                      className="w-full text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden"
                    />
                    <span className="text-xs text-indigo-600 font-semibold shrink-0">
                      Giliran {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-indigo-800/90 font-medium">
                💡 <span className="font-semibold">Sistem Giliran:</span> Soalan akan bertukar giliran secara automatik dari Pemain 1 hingga Pemain {playerCount}!
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Game Rules & Start Button (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Peraturan Ringkas Permainan:
            </span>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <span>
                  <strong className="text-slate-900 font-bold">Kriteria SMART:</strong> Nilai situasi harian Malaysia (simpan duit, beli kereta, cari kerja) dan pilih jawapan SMART yang tepat.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <span>
                  <strong className="text-slate-900 font-bold">Maklum Balas Segera:</strong> Ketahui betul atau salah serta-merta dengan satu penjelasan padat (+100 mata).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <span>
                  <strong className="text-slate-900 font-bold">Papan Skor & Kedudukan:</strong> Semak keputusan akhir dan anda boleh kembali ke atas bila-bila masa untuk cuba kategori lain.
                </span>
              </div>
            </div>
          </div>

          {/* Main Action: Start or Restart Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onStartOrRestart}
              className="w-full flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              {gameStarted ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>Mula Semula Kategori Ini</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Mulakan Cabaran SMART</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onScrollToChallenge}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              title="Pergi ke Bahagian 2"
            >
              Lihat Soalan ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
