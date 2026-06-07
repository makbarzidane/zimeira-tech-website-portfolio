import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description:
    "Syarat layanan ZIMEIRA TECH untuk jasa komputer, desain, website, DP, ongkir, revisi, dan proses pengerjaan.",
};

const sections: LegalSection[] = [
  {
    title: "Ruang lingkup layanan",
    body: [
      "ZIMEIRA TECH menyediakan layanan komputer, perawatan laptop/PC, instalasi Windows dan aplikasi, rakit PC sesuai budget, penggantian part, repasta, print/download tugas, desain visual, website usaha, landing page, website portfolio, SEO dasar, dan maintenance website.",
      "Detail pekerjaan, estimasi biaya, estimasi waktu, dan kebutuhan material akan dikonfirmasi sebelum pengerjaan dimulai.",
    ],
  },
  {
    title: "Konsultasi dan pemesanan",
    body: [
      "Konsultasi awal bersifat gratis. Pelanggan disarankan menjelaskan kebutuhan, kendala, budget, dan target pengerjaan dengan jelas agar rekomendasi lebih tepat.",
      "Pengerjaan dimulai setelah pelanggan menyetujui ruang lingkup, estimasi, dan ketentuan pembayaran yang disampaikan.",
    ],
  },
  {
    title: "Pembayaran dan DP",
    body: [
      "Untuk project website, DP yang disarankan adalah 50% setelah ruang lingkup dan estimasi disetujui. Pelunasan dilakukan sebelum website diserahkan, dipublish, atau akses final diberikan.",
      "Untuk desain logo, banner, poster, flyer, atau materi promosi lain, DP yang disarankan adalah 50% sebelum pengerjaan. File final diberikan setelah pelunasan dan revisi yang disepakati selesai.",
      "Biaya pihak ketiga seperti domain, hosting, lisensi, template premium, aset berbayar, atau biaya platform dapat ditagihkan di awal jika perlu dibelikan oleh ZIMEIRA TECH.",
    ],
  },
  {
    title: "Antar jemput perangkat",
    body: [
      "Antar jemput laptop atau PC dapat dibantu untuk area tertentu di Pagaralam dan sekitarnya. Biaya ongkir disesuaikan dengan jarak dan dikonfirmasi sebelum penjemputan.",
      "Pelanggan bertanggung jawab memastikan perangkat dan kelengkapannya sudah diinformasikan dengan benar saat diserahkan.",
    ],
  },
  {
    title: "Revisi dan perubahan kebutuhan",
    body: [
      "Revisi mengikuti kesepakatan awal agar proses tetap rapi dan terukur. Perubahan besar di luar scope awal dapat memengaruhi biaya dan waktu pengerjaan.",
      "Untuk website dan desain, pelanggan disarankan menyiapkan materi seperti teks, foto, logo, warna brand, referensi, dan data kontak sebelum pengerjaan dimulai.",
    ],
  },
  {
    title: "Pembatalan",
    body: [
      "Jika pelanggan membatalkan setelah pekerjaan berjalan, biaya atau DP dapat digunakan untuk menutup waktu kerja, konsultasi teknis, pembelian aset, atau proses yang sudah dikerjakan.",
      "Jika pembatalan terjadi sebelum pengerjaan dimulai dan belum ada pembelian aset pihak ketiga, pengembalian dapat dibahas sesuai kondisi.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Syarat Layanan"
      description="Halaman ini menjelaskan aturan dasar layanan ZIMEIRA TECH agar proses konsultasi, pengerjaan, pembayaran, dan revisi berjalan jelas sejak awal."
      sections={sections}
    />
  );
}
