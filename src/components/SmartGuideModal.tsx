import React from 'react';
import { X, CheckCircle2, BookOpen } from 'lucide-react';

interface SmartGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartGuideModal: React.FC<SmartGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const criteria = [
    {
      letter: 'S',
      title: 'Specific (Khusus)',
      color: 'bg-rose-500 text-white',
      badge: 'border-rose-200 bg-rose-50 text-rose-800',
      description: 'Jelas dan terperinci. Menjawab Siapa, Apa, Di Mana, dan Bagaimana. Elakkan kenyataan samar seperti "saya nak kaya".',
      campusExample: 'Contoh: "Simpan RM350 sebulan ke dalam ASB untuk kumpul deposit Perodua Axia RM4,200."'
    },
    {
      letter: 'M',
      title: 'Measurable (Boleh Diukur)',
      color: 'bg-amber-500 text-white',
      badge: 'border-amber-200 bg-amber-50 text-amber-800',
      description: 'Mempunyai angka, peratusan, atau jumlah ringgit yang tepat supaya anda tahu bila matlamat itu tercapai.',
      campusExample: 'Contoh: "Hantar 5 resume seminggu di JobStreet/LinkedIn dan hadiri 3 sesi temuduga kerja."'
    },
    {
      letter: 'A',
      title: 'Achievable (Boleh Dicapai)',
      color: 'bg-emerald-500 text-white',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      description: 'Realistik dan mampu dibuat mengikut kemampuan kewangan, masa, dan tenaga harian anda.',
      campusExample: 'Contoh: "Masak sendiri di hostel 4 hari seminggu untuk jimat RM150, bukannya berlapar tanpa makan."'
    },
    {
      letter: 'R',
      title: 'Relevant (Relevan)',
      color: 'bg-sky-500 text-white',
      badge: 'border-sky-200 bg-sky-50 text-sky-800',
      description: 'Penting dan memberi manfaat langsung kepada kehidupan sebenar, kerjaya graduan, atau masa depan anda.',
      campusExample: 'Contoh: "Selesaikan bayaran balik PTPTN RM150 secara auto-debit untuk menjaga rekod kredit CCRIS bersih."'
    },
    {
      letter: 'T',
      title: 'Time-bound (Terikat Masa)',
      color: 'bg-purple-500 text-white',
      badge: 'border-purple-200 bg-purple-50 text-purple-800',
      description: 'Mempunyai tarikh akhir yang jelas untuk mengelakkan tabiat bertangguh dan membina disiplin diri.',
      campusExample: 'Contoh: "Kumpul wang kecemasan RM2,000 selewat-lewatnya pada 31 Disember tahun ini."'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                Panduan Pantas Kerangka SMART
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Khas untuk simpanan wang, beli kereta, mencari pekerjaan & gaya hidup di Malaysia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 my-4">
          {criteria.map((item) => (
            <div
              key={item.letter}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shadow-xs ${item.color}`}>
                  {item.letter}
                </span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {item.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-2 leading-relaxed">
                {item.description}
              </p>
              <div className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${item.badge}`}>
                💡 <span className="font-semibold">Contoh Nyata:</span> {item.campusExample}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Selesaikan cabaran di skrin dalam masa kurang daripada 15 minit!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            Kembali ke Permainan
          </button>
        </div>
      </div>
    </div>
  );
};
