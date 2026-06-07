export function normalizePhoneForWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

export function createWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = normalizePhoneForWhatsApp(phone);

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function createConsultationMessage(service = "Konsultasi layanan") {
  return `Halo ZIMEIRA TECH, saya ingin konsultasi gratis tentang ${service}.`;
}

function normalizeSocialHandle(username: string) {
  return username.trim().replace(/^@/, "");
}

export function createInstagramUrl(username: string) {
  return `https://www.instagram.com/${normalizeSocialHandle(username)}`;
}

export function createTiktokUrl(username: string) {
  return `https://www.tiktok.com/@${normalizeSocialHandle(username)}`;
}
