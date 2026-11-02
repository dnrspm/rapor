export type Level = "kurang" | "sedang" | "baik";
export type TrendDirection = "down" | "up" | "flat";

export type Comparison = {
  provinsi: { rank: string; range: string };
  nasional: { rank: string; range: string };
};

export type SubIndicator = { name: string; score: string };

export type IndicatorSummary = {
  name: string;
  level: Level;
  label: string;
  trend: { direction: TrendDirection; value?: string };
  comparison: Comparison;
  subIndicators: SubIndicator[];
  hiddenCount: number;
};

const sampleComparison: Comparison = {
  provinsi: { rank: "Peringkat menengah atas", range: "41-60%" },
  nasional: { rank: "Peringkat menengah bawah", range: "61-80%" },
};

export const mainIndicator: IndicatorSummary = {
  name: "Kemampuan Literasi",
  level: "kurang",
  label: "Kurang (40% Siswa sudah mencapai kompetensi minimum)",
  trend: { direction: "down", value: "2" },
  comparison: sampleComparison,
  subIndicators: [
    { name: "Kompetensi membaca teks informasi", score: "60,26" },
    { name: "Kompetensi membaca teks sastra", score: "60,61" },
    { name: "Kompetensi Mengakses dan Menemukan Isi Teks (L1)", score: "63,56" },
    {
      name: "Kompetensi Menginterpretasi dan Memahami Isi Teks (L2)",
      score: "57,78",
    },
  ],
  hiddenCount: 1,
};

export const relatedIndicators: IndicatorSummary[] = [
  {
    name: "Kualitas Pembelajaran",
    level: "kurang",
    label: "Kurang",
    trend: { direction: "down", value: "3" },
    comparison: sampleComparison,
    subIndicators: [
      { name: "Manajemen kelas", score: "68" },
      { name: "Dukungan psikologis", score: "72" },
    ],
    hiddenCount: 1,
  },
  {
    name: "Refleksi dan Perbaikan Pembelajaran oleh Guru",
    level: "sedang",
    label: "Sedang",
    trend: { direction: "flat" },
    comparison: sampleComparison,
    subIndicators: [
      { name: "Belajar tentang pembelajaran", score: "72" },
      { name: "Penerapan praktik inovatif", score: "74" },
    ],
    hiddenCount: 0,
  },
  {
    name: "Kepemimpinan Instruksional",
    level: "baik",
    label: "Baik",
    trend: { direction: "up", value: "2,54" },
    comparison: sampleComparison,
    subIndicators: [
      { name: "Visi Misi Sekolah", score: "70" },
      { name: "Dukungan untuk refleksi guru", score: "72" },
    ],
    hiddenCount: 1,
  },
];

export const reflectionQuestions = [
  "Seberapa sering guru dan tenaga pendidik membahas hasil asesmen literasi murid bersama?",
  "Dukungan apa yang sudah diberikan Satdik saya untuk meningkatkan kemampuan literasi murid?",
];

export type InspirationColor = "primary" | "success" | "warning";

export type Inspiration = {
  text: string;
  image: string;
  color: InspirationColor;
};

export type MaterialType = "video" | "artikel" | "dokumen" | "platform";

export type Material = {
  type: MaterialType;
  title: string;
  source: string;
  url: string;
};

export type RecommendationPanel = {
  title: string;
  description: string;
  highlight: string;
  inspirations: Inspiration[];
  materials: Material[];
};

/**
 * CONTOH DATA: judul dan tautan di bawah hanyalah placeholder untuk
 * memperlihatkan tampilan pop up. Ganti dengan materi sebenarnya dari API/CMS.
 */
const sampleMaterials = (topic: string): Material[] => [
  {
    type: "video",
    title: `Strategi mengajar ${topic} di kelas`,
    source: "YouTube · Merdeka Mengajar",
    url: "https://www.youtube.com/",
  },
  {
    type: "artikel",
    title: `Praktik baik: meningkatkan ${topic} siswa`,
    source: "Blog Guru Berbagi",
    url: "https://example.com/blog/praktik-baik",
  },
  {
    type: "dokumen",
    title: `Panduan lengkap ${topic} untuk satuan pendidikan`,
    source: "PDF · 12 halaman",
    url: "https://example.com/panduan.pdf",
  },
  {
    type: "platform",
    title: "Modul pelatihan mandiri di Platform Merdeka Mengajar",
    source: "Platform Merdeka Mengajar",
    url: "https://example.com/pmm",
  },
];

export type RecommendationGroup = {
  title: string;
  level: Level;
  label: string;
  defaultOpen: boolean;
  panels: RecommendationPanel[];
};

const sharedThird: Inspiration = {
  text: "Satuan Pendidikan memfasilitasi adanya kebijakan dan penganggaran terkait penguatan literasi.",
  image: "/assets/rekom/info-3.png",
  color: "warning",
};

const managementThird: Inspiration = {
  text: "Satuan Pendidikan memfasilitasi adanya kebijakan dan penganggaran terkait penerapan manajemen...",
  image: "/assets/rekom/info-3.png",
  color: "warning",
};

export const recommendationGroups: RecommendationGroup[] = [
  {
    title: "Kemampuan Literasi",
    level: "kurang",
    label: "Kurang (40% Siswa sudah mencapai kompetensi minimum)",
    defaultOpen: true,
    panels: [
      {
        title: "Kompetensi membaca teks informasi",
        description:
          "Kemampuan untuk memahami teks informasi berkaitan erat dengan kemampuan literasi siswa secara keseluruhan.",
        highlight:
          "melalui peningkatan kompetensi GTK dan kebijakan yang menunjang kompetensi membaca teks informasi",
        inspirations: [
          {
            text: "Satuan Pendidikan meningkatkan kompetensi GTK dengan mempelajari konten terkait teks informasi yang...",
            image: "/assets/rekom/info-1.png",
            color: "primary",
          },
          {
            text: "Satuan Pendidikan meningkatkan kompetensi GTK dengan mempelajari konten terkait teks informasi yang...",
            image: "/assets/rekom/info-2.png",
            color: "success",
          },
          sharedThird,
        ],
        materials: sampleMaterials("membaca teks informasi"),
      },
      {
        title: "Kompetensi membaca teks sastra",
        description:
          "Kemampuan untuk memahami teks sastra berkaitan erat dengan kemampuan literasi siswa secara keseluruhan.",
        highlight:
          "melalui peningkatan kompetensi guru dan kebijakan yang menunjang kompetensi membaca teks sastra",
        inspirations: [
          {
            text: "Satuan Pendidikan meningkatkan kompetensi GTK dengan mempelajari konten terkait teks sastra yang...",
            image: "/assets/rekom/sastra-1.png",
            color: "primary",
          },
          {
            text: "Satuan Pendidikan melalui GTK mengimplementasikan pembelajaran tentang teks sastra yang...",
            image: "/assets/rekom/sastra-2.png",
            color: "success",
          },
          sharedThird,
        ],
        materials: sampleMaterials("membaca teks sastra"),
      },
    ],
  },
  {
    title: "Kualitas Pembelajaran",
    level: "kurang",
    label: "Kurang",
    defaultOpen: true,
    panels: [
      {
        title: "Manajemen Kelas",
        description:
          "Pengelolaan kelas yang mendukung pembelajaran serta penerapan penghargaan dan sanksi secara proporsional mendukung peningkatan kualitas pembelajaran.",
        highlight:
          "melalui peningkatan kompetensi GTK dan kebijakan yang menunjang pengelolaan kelas",
        inspirations: [
          {
            text: "Satuan Pendidikan meningkatkan kompetensi GTK dengan mempelajari konten terkait pengelolaan...",
            image: "/assets/rekom/kelas-1.png",
            color: "primary",
          },
          {
            text: "Satuan Pendidikan melalui GTK mengembangkan dan mengimplementasikan...",
            image: "/assets/rekom/kelas-2.png",
            color: "success",
          },
          managementThird,
        ],
        materials: sampleMaterials("manajemen kelas"),
      },
      {
        title: "Dukungan Psikologis",
        description:
          "Praktik pembelajaran yang memenuhi kebutuhan psikologis siswa untuk menumbuhkan kepercayaan diri dan perasaan diterima tanpa dibeda-bedakan mendukung peningkatan kualitas pembelajaran.",
        highlight:
          "melalui peningkatan kompetensi GTK dan kebijakan yang menunjang dukungan afektif kepada murid",
        inspirations: [
          {
            text: "Satuan Pendidikan meningkatkan kompetensi GTK dengan mempelajari konten pengembangan diri...",
            image: "/assets/rekom/dukungan-1.png",
            color: "primary",
          },
          {
            text: "Satuan Pendidikan melalui GTK mengimplementasikan pembelajaran yang mendukung kenyamanan...",
            image: "/assets/rekom/dukungan-2.png",
            color: "success",
          },
          managementThird,
        ],
        materials: sampleMaterials("dukungan psikologis"),
      },
    ],
  },
  {
    title: "Refleksi dan Perbaikan Pembelajaran oleh Guru",
    level: "sedang",
    label: "Sedang",
    defaultOpen: false,
    panels: [],
  },
  {
    title: "Kepemimpinan Instruksional",
    level: "baik",
    label: "Baik",
    defaultOpen: false,
    panels: [],
  },
];
