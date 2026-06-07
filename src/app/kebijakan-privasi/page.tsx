import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi ZIMEIRA TECH terkait data kontak, konsultasi, layanan perangkat, desain, dan website.",
};

const sections: LegalSection[] = [
  {
    title: "Data yang dikumpulkan",
    body: [
      "ZIMEIRA TECH dapat menerima data seperti nama, nomor WhatsApp, email, jenis layanan yang dibutuhkan, pesan konsultasi, alamat atau area layanan, serta file atau gambar yang Anda kirim untuk kebutuhan pengerjaan.",
      "Untuk layanan perangkat, kami juga dapat mencatat informasi teknis yang relevan seperti tipe perangkat, keluhan, kondisi awal, dan rekomendasi pengerjaan.",
    ],
  },
  {
    title: "Penggunaan data",
    body: [
      "Data digunakan untuk membalas konsultasi, membuat estimasi, mengatur jadwal pengerjaan, mengirim progres, memproses revisi, dan menyelesaikan layanan yang Anda pesan.",
      "Data portfolio atau testimoni hanya akan ditampilkan jika sudah mendapat izin atau jika identitas pelanggan disamarkan sesuai kesepakatan.",
    ],
  },
  {
    title: "Penyimpanan dan keamanan",
    body: [
      "ZIMEIRA TECH berupaya menjaga data pelanggan agar tidak digunakan di luar kebutuhan layanan. Akses admin website dibatasi dengan sistem login.",
      "Jangan mengirim password akun pribadi, kode OTP, PIN perbankan, data pembayaran sensitif, atau file rahasia yang tidak diperlukan untuk pengerjaan.",
    ],
  },
  {
    title: "Layanan pihak ketiga",
    body: [
      "Website dapat menggunakan layanan pihak ketiga seperti WhatsApp, email, analytics, hosting, domain, database, atau storage gambar. Layanan tersebut memiliki kebijakan privasi masing-masing.",
      "Saat Anda menghubungi melalui WhatsApp atau media sosial, sebagian data percakapan juga diproses oleh platform tersebut.",
    ],
  },
  {
    title: "Hak pelanggan",
    body: [
      "Anda dapat meminta koreksi, penghapusan, atau penyamaran data yang pernah dikirim kepada ZIMEIRA TECH selama permintaan tersebut masih memungkinkan dan tidak mengganggu kewajiban administrasi layanan.",
      `Permintaan dapat dikirim melalui kontak resmi ${siteConfig.name}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      description="Halaman ini menjelaskan bagaimana ZIMEIRA TECH menerima, menggunakan, dan menjaga data pelanggan dalam proses konsultasi dan layanan."
      sections={sections}
    />
  );
}
