import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer layanan ZIMEIRA TECH untuk perangkat, software, website, desain, portfolio, dan estimasi pengerjaan.",
};

const sections: LegalSection[] = [
  {
    title: "Informasi umum",
    body: [
      "Informasi di website ZIMEIRA TECH dibuat untuk membantu calon pelanggan memahami layanan yang tersedia. Konten dapat berubah sewaktu-waktu mengikuti kebutuhan layanan, kondisi perangkat, harga komponen, atau kebijakan pihak ketiga.",
      "Estimasi harga dan waktu pengerjaan yang diberikan saat konsultasi bersifat awal sampai detail kebutuhan diperiksa dan disetujui.",
    ],
  },
  {
    title: "Layanan perangkat",
    body: [
      "Hasil perawatan, cleaning, repasta, instalasi, penggantian part, atau upgrade perangkat dapat berbeda tergantung kondisi awal laptop/PC, usia komponen, kerusakan tersembunyi, dan ketersediaan part.",
      "Pelanggan disarankan melakukan backup data penting sebelum perangkat diperbaiki, diinstal ulang, atau diubah konfigurasinya. ZIMEIRA TECH tidak bertanggung jawab atas kehilangan data yang sebelumnya tidak diinformasikan atau tidak dibackup.",
    ],
  },
  {
    title: "Software dan lisensi",
    body: [
      "ZIMEIRA TECH mendorong penggunaan software dan lisensi yang legal. Instalasi Windows lisensi resmi atau software berbayar memerlukan lisensi yang valid dari pelanggan atau pembelian terpisah sesuai kebutuhan.",
      "Akun, password, kode OTP, dan akses pribadi pelanggan tidak boleh dibagikan kecuali benar-benar diperlukan dan sudah dipahami risikonya.",
    ],
  },
  {
    title: "Website dan desain",
    body: [
      "Hasil website, SEO dasar, desain logo, banner, poster, flyer, atau materi promosi bergantung pada materi yang diberikan, revisi yang disepakati, dan batas ruang lingkup project.",
      "SEO dasar membantu menyiapkan struktur dan konten agar lebih layak dibaca mesin pencari, tetapi tidak menjamin posisi tertentu di Google atau mesin pencari lainnya.",
    ],
  },
  {
    title: "Portfolio dan testimoni",
    body: [
      "Portfolio dan testimoni dapat menggunakan contoh dummy sampai data asli tersedia. Identitas pelanggan dapat disamarkan untuk menjaga privasi.",
      "Gambar portfolio yang diunggah melalui admin sebaiknya merupakan gambar yang memang dimiliki atau diizinkan untuk digunakan oleh ZIMEIRA TECH.",
    ],
  },
  {
    title: "Batas tanggung jawab",
    body: [
      "ZIMEIRA TECH berupaya memberikan rekomendasi dan pengerjaan yang rapi, tetapi tidak dapat menjamin perangkat lama, komponen rusak, platform pihak ketiga, hosting, domain, atau layanan eksternal selalu berjalan tanpa kendala.",
      "Setiap keputusan pengerjaan dilakukan setelah pelanggan memahami estimasi, manfaat, risiko, dan batas layanan yang dijelaskan.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Halaman ini menjelaskan batas informasi, estimasi, dan tanggung jawab layanan agar pelanggan memahami ruang lingkup pekerjaan dengan jelas."
      sections={sections}
    />
  );
}
