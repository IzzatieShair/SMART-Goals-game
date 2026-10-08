export interface ChallengeQuestion {
  id: string;
  category: string;
  tag: string;
  scenario: string;
  vagueGoal: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  smartFocus: 'Specific' | 'Measurable' | 'Achievable' | 'Relevant' | 'Time-bound';
  tip: string;
}

export interface GamePack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badgeColor: string;
  challenges: ChallengeQuestion[];
}

export const GAME_PACKS: GamePack[] = [
  {
    id: 'pack-finance',
    title: 'Pek 1: Simpanan & Beli Kereta Pertama',
    subtitle: 'Kewangan harian, tabung kecemasan & deposit kereta',
    icon: '🚗',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    challenges: [
      {
        id: 'fin-1',
        category: 'Beli Kereta Pertama',
        tag: '🚗 Deposit Kereta Perodua Axia / Bezza',
        scenario: 'Afiq baru sahaja melangkah ke tahun akhir universiti dan mahu membeli kereta terpakai atau Perodua Axia selepas graduasi untuk berulang-alik ke tempat kerja.',
        vagueGoal: '"Saya nak kumpul duit beli kereta secepat mungkin."',
        question: 'Pernyataan manakah yang mengubah impian Afiq menjadi matlamat SMART yang lengkap?',
        options: [
          { id: 'a', text: 'Tidak menetapkan sebarang jumlah simpanan supaya tidak merasa tertekan setiap bulan.' },
          { id: 'b', text: '"Simpan RM350 sebulan daripada elaun dan kerja sambilan ke dalam akaun ASB untuk mencapai wang pendahuluan deposit kereta RM4,200 dalam tempoh 12 bulan."' },
          { id: 'c', text: 'Beli kereta mewah import tanpa bayaran muka menggunakan kad kredit rakan.' },
          { id: 'd', text: 'Hanya menyimpan wang syiling yang tinggal di dalam poket seluar pada hujung tahun.' }
        ],
        correctOptionId: 'b',
        explanation: 'Tepat sekali! Menyatakan jumlah RM350 sebulan, lokasi simpanan (ASB), sasaran deposit RM4,200, dan tempoh tepat (12 bulan) menjadikannya Khusus (Specific), Boleh Diukur (Measurable), dan Terikat Masa (Time-bound).',
        smartFocus: 'Specific',
        tip: 'Khusus & Boleh Diukur: Ada angka jelas (RM350/bulan dan RM4,200 dalam 12 bulan).'
      },
      {
        id: 'fin-2',
        category: 'Simpanan & Tabung Kecemasan',
        tag: '💰 Tabung Simpanan Kecemasan Mahasiswa',
        scenario: 'Nurul sering kehabisan wang saku sebelum hujung bulan kerana kerap memesan makanan melalui aplikasi e-hailing dan membeli kopi mahal di kafe.',
        vagueGoal: '"Saya nak jimat duit dan banyakkan simpanan semester ini."',
        question: 'Bagaimanakah Nurul boleh menstrukturkan matlamat ini agar Boleh Dicapai (Achievable) dan Relevan (Relevant)?',
        options: [
          { id: 'a', text: 'Berpuasa makan selama sebulan penuh dan berjalan kaki sejauh 20km setiap hari.' },
          { id: 'b', text: '"Hadkan perbelanjaan kopi kepada 1 kali seminggu dan masak sendiri di kolej kediaman 4 hari seminggu untuk menjimatkan RM150 sebulan ke dalam Tabung Haji sepanjang Mac hingga Julai."' },
          { id: 'c', text: 'Berharap baki akaun Maybank bertambah sendiri tanpa mengubah tabiat berbelanja.' },
          { id: 'd', text: 'Meminjam wang daripada rakan serumah setiap kali teringin berbelanja mewah.' }
        ],
        correctOptionId: 'b',
        explanation: 'Hebat! Menggantikan pesanan mahal dengan masak sendiri 4 hari seminggu dan sasaran RM150 sebulan adalah realistik (Achievable), relevan untuk mahasiswa, serta mempunyai tempoh masa (Mac-Julai).',
        smartFocus: 'Achievable',
        tip: 'Boleh Dicapai (Achievable): Tabiat masak 4 hari seminggu adalah realistik dan berkesan.'
      },
      {
        id: 'fin-3',
        category: 'Aset Pelajar & Pembelajaran',
        tag: '💻 Beli Laptop Baharu untuk Kerja & FYP',
        scenario: 'Laptop lama Haris sering terpadam sendiri semasa menyiapkan tugasan coding dan projek tahun akhir (FYP). Dia perlu membeli laptop baru berharga RM2,400.',
        vagueGoal: '"Beli laptop baru sebelum semester baru mula."',
        question: 'Pilihan manakah yang menjadikan matlamat Haris Terikat Masa (Time-bound) dan Boleh Diukur (Measurable)?',
        options: [
          { id: 'a', text: '"Mengambil kerja sambilan hujung minggu (RM400/bulan) dan mengetepikan RM300 daripada elaun praktikal bagi mengumpul RM2,400 selewat-lewatnya pada 31 Ogos ini."' },
          { id: 'b', text: 'Menunggu sehingga laptop lama rosak sepenuhnya sebelum memikirkan cara mencari duit.' },
          { id: 'c', text: 'Menghantar mesej di media sosial meminta orang ramai mendermakan laptop percuma.' },
          { id: 'd', text: 'Membeli laptop secara ansuran tanpa mempunyai sebarang sumber pendapatan tetap.' }
        ],
        correctOptionId: 'a',
        explanation: 'Cemerlang! Matlamat ini menetapkan pelan tindakan (kerja sambilan + elaun), angka jelas (RM2,400), dan tarikh akhir yang tepat (31 Ogos).',
        smartFocus: 'Time-bound',
        tip: 'Terikat Masa (Time-bound): Tarikh akhir 31 Ogos memberi fokus dan disiplin tindakan.'
      }
    ]
  },
  {
    id: 'pack-career',
    title: 'Pek 2: Cari Kerja & Kerjaya Pertama',
    subtitle: 'Permohonan kerja graduan, temuduga & kemahiran kerja',
    icon: '💼',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    challenges: [
      {
        id: 'car-1',
        category: 'Cari Kerja Pertama',
        tag: '💼 Permohonan Kerja Graduan di Lembah Klang',
        scenario: 'Farhan bakal menamatkan pengajian Ijazah Sarjana Muda dan berhasrat mendapatkan pekerjaan pertama dalam bidang teknologi atau pemasaran.',
        vagueGoal: '"Saya mahu dapat kerja gaji lumayan lepas grad."',
        question: 'Apakah pelan tindakan yang mengikut kriteria SMART untuk Farhan?',
        options: [
          { id: 'a', text: 'Menunggu syarikat ternama menghubungi beliau tanpa memohon apa-apa.' },
          { id: 'b', text: '"Menghantar 5 resume yang disesuaikan setiap minggu melalui JobStreet dan LinkedIn kepada syarikat di Cyberjaya/KL, serta menghadiri sekurang-kurangnya 3 sesi temuduga sebelum 15 Jun."' },
          { id: 'c', text: 'Hanya meminta kerja di status WhatsApp peribadi.' },
          { id: 'd', text: 'Menolak semua peluang pekerjaan jika gaji permulaan kurang daripada RM15,000.' }
        ],
        correctOptionId: 'b',
        explanation: 'Tepat sekali! Menetapkan 5 resume seminggu, platform sasaran (JobStreet/LinkedIn), sasaran 3 temuduga, dan tarikh akhir 15 Jun menjadikannya berfokus dan berdisiplin.',
        smartFocus: 'Specific',
        tip: 'Khusus & Boleh Diukur: 5 resume seminggu + 3 temuduga sebelum 15 Jun.'
      },
      {
        id: 'car-2',
        category: 'Kemahiran Temuduga',
        tag: '🗣️ Latihan Komunikasi & Bahasa Inggeris',
        scenario: 'Priya berasa gementar setiap kali perlu bercakap dalam Bahasa Inggeris semasa temuduga kerja dengan syarikat multinasional (MNC).',
        vagueGoal: '"Saya nak fasih speaking Bahasa Inggeris untuk temuduga."',
        question: 'Manakah matlamat SMART yang paling Boleh Dicapai (Achievable) dan Relevan (Relevant)?',
        options: [
          { id: 'a', text: 'Menghafal seluruh kamus Dewan Bahasa dan Oxford dalam masa semalam.' },
          { id: 'b', text: '"Mengadakan sesi latihan temuduga tiruan 30 minit bersama rakan belajar 2 kali seminggu dan membaca 1 artikel berita perniagaan setiap hari selama 6 minggu menjelang sesi temuduga Julai."' },
          { id: 'c', text: 'Hanya menonton filem aksi tanpa sari kata bila ada masa lapang.' },
          { id: 'd', text: 'Mengelak daripada menghadiri sebarang temuduga yang menggunakan Bahasa Inggeris.' }
        ],
        correctOptionId: 'b',
        explanation: 'Mantap! Sesi 30 minit 2 kali seminggu selama 6 minggu adalah tindakan konsisten, boleh dicapai, dan secara langsung menyelesaikan masalah kegugupan temuduga.',
        smartFocus: 'Measurable',
        tip: 'Boleh Diukur: 2 kali seminggu, 30 minit setiap sesi, selama 6 minggu.'
      },
      {
        id: 'car-3',
        category: 'Peningkatan Nilai Pasaran Graduan',
        tag: '📜 Pensijilan Profesional & Portfolio Digital',
        scenario: 'Danish mahu menonjolkan diri berbanding graduan lain semasa memohon skim eksekutif pelatih (Management Trainee).',
        vagueGoal: '"Saya nak buat sijil tambahan untuk cantikkan resume."',
        question: 'Bagaimanakah matlamat Danish boleh dijadikan Time-bound dan Specific?',
        options: [
          { id: 'a', text: '"Menghabiskan kursus sijil Google Data Analytics di Coursera dengan meluangkan 5 jam seminggu dan memuat naik projek akhir ke portfolio GitHub sebelum 30 Ogos."' },
          { id: 'b', text: 'Mendaftar 20 kursus percuma serentak tetapi tidak menghabiskan mana-mana satu modul.' },
          { id: 'c', text: 'Berharap syarikat tidak mementingkan sebarang kemahiran atau sijil tambahan.' },
          { id: 'd', text: 'Hanya mencetak sijil kehadiran bengkel orientasi tahun satu universiti.' }
        ],
        correctOptionId: 'a',
        explanation: 'Sangat baik! Menyebut kursus khusus (Google Data Analytics), komitmen masa (5 jam seminggu), hasil nyata (portfolio GitHub), dan tarikh akhir (30 Ogos) memenuhi prinsip SMART.',
        smartFocus: 'Time-bound',
        tip: 'Terikat Masa & Khusus: Sasaran 30 Ogos dengan hasil portfolio GitHub yang boleh dinilai majikan.'
      }
    ]
  },
  {
    id: 'pack-lifestyle',
    title: 'Pek 3: Kehidupan Harian & Kesihatan',
    subtitle: 'Disiplin masa, bayaran PTPTN & kecergasan tubuh',
    icon: '🏃',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    challenges: [
      {
        id: 'life-1',
        category: 'Tanggungjawab Kewangan',
        tag: '💳 Bayar Balik Pinjaman PTPTN Secara Konsisten',
        scenario: 'Zul baru mula bekerja dengan gaji permulaan dan mahu mengekalkan rekod kredit CCRIS yang bersih dengan membayar pinjaman PTPTN.',
        vagueGoal: '"Saya nak bayar hutang PTPTN bila ada duit lebih."',
        question: 'Apakah bentuk matlamat SMART yang menjamin bayaran PTPTN Zul teratur?',
        options: [
          { id: 'a', text: 'Menunggu surat amaran guaman sebelum membuat sebarang bayaran.' },
          { id: 'b', text: '"Mengaktifkan potongan auto-debit RM150 setiap 28 haribulan terus ke akaun PTPTN melalui perbankan internet bermula bulan gaji pertama selama 24 bulan berturut-turut."' },
          { id: 'c', text: 'Membayar RM10 sekali-sekala apabila teringat di media sosial.' },
          { id: 'd', text: 'Menganggap pinjaman pelajaran tidak perlu dibayar langsung.' }
        ],
        correctOptionId: 'b',
        explanation: 'Terbaik! Auto-debit RM150 pada tarikh tetap (28 haribulan) untuk 24 bulan adalah tepat, boleh diukur, boleh dicapai, dan melindungi skor kredit CCRIS.',
        smartFocus: 'Measurable',
        tip: 'Boleh Diukur & Berjadual: Potongan tetap RM150 pada 28 haribulan secara auto-debit.'
      },
      {
        id: 'life-2',
        category: 'Kesihatan & Kecergasan',
        tag: '🏃 Gaya Hidup Aktif & Stamina Diri',
        scenario: 'Siti berasa cepat letih dan sering mengantuk semasa kuliah pagi akibat gaya hidup tidak aktif dan kurang bersenam di kampus.',
        vagueGoal: '"Saya nak jadi sihat dan kurus semester ini."',
        question: 'Manakah rumusan matlamat SMART yang paling realistik untuk Siti?',
        options: [
          { id: 'a', text: 'Berlari maraton 42km pada hari pertama tanpa sebarang persediaan latihan.' },
          { id: 'b', text: '"Berjoging atau jalan pantas 30 minit di trek sukan kampus pada setiap hari Selasa, Khamis, dan Ahad petang, serta minum 2 liter air kosong setiap hari selama 8 minggu."' },
          { id: 'c', text: 'Tidak makan sebarang nasi selama 6 bulan dan hanya minum air manis.' },
          { id: 'd', text: 'Membeli kasut sukan mahal tetapi hanya menyimpannya di bawah katil hostel.' }
        ],
        correctOptionId: 'b',
        explanation: 'Tepat sekali! Menetapkan 3 hari seminggu, durasi 30 minit, minum 2 liter air, dan komitmen 8 minggu adalah matlamat yang seimbang dan boleh dicapai.',
        smartFocus: 'Achievable',
        tip: 'Boleh Dicapai (Achievable): 3 kali seminggu selama 30 minit membina tabiat kekal tanpa kecederaan.'
      },
      {
        id: 'life-3',
        category: 'Pengurusan Waktu & Tidur',
        tag: '⏰ Disiplin Bangun Pagi & Hadir Kuliah',
        scenario: 'Aiman kerap tidur lewat sehingga jam 3 pagi kerana leka melayari media sosial, menyebabkan beliau sering lewat hadir kuliah jam 8:00 pagi.',
        vagueGoal: '"Saya nak bangun awal dan tak nak ponteng kelas lagi."',
        question: 'Bagaimanakah matlamat ini boleh dijadikan Relevant dan Time-bound?',
        options: [
          { id: 'a', text: '"Menutup skrin telefon bimbit pada jam 11:30 malam, tidur sekurang-kurangnya 7 jam setiap malam Isnin hingga Jumaat, dan tiba di bilik kuliah selewat-lewatnya 7:50 pagi sepanjang semester ini."' },
          { id: 'b', text: 'Memasang 50 penggera jam loceng tetapi terus menekan punang tunda (snooze).' },
          { id: 'c', text: 'Mengambil cuti semester supaya tidak perlu bangun awal pagi.' },
          { id: 'd', text: 'Meminum 4 tin minuman tenaga setiap malam untuk mengelakkan tidur.' }
        ],
        correctOptionId: 'a',
        explanation: 'Mantap! Menetapkan had masa tutup skrin 11:30 malam dan sasaran tiba 7:50 pagi Isnin-Jumaat memberikan sempadan masa dan matlamat kehadiran yang jelas.',
        smartFocus: 'Time-bound',
        tip: 'Terikat Masa: Waktu tutup skrin 11:30 malam dan waktu tiba kuliah 7:50 pagi.'
      }
    ]
  }
];

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export const DEFAULT_GROUP_PLAYERS: Player[] = [
  { id: 'p1', name: 'Afiq', avatar: '🎓', color: 'from-blue-500 to-indigo-600' },
  { id: 'p2', name: 'Priya', avatar: '🚗', color: 'from-amber-500 to-orange-600' },
  { id: 'p3', name: 'Wei Ming', avatar: '💼', color: 'from-emerald-500 to-teal-600' }
];
