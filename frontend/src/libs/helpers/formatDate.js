export function parseDateString(str) {
  if (!str) return null;
  return new Date(str.replace(/-/g, "/"));
}

// Mengubah objek Date menjadi string "YYYY-MM-DD"
export function formatDateForInput(date) {
  if (!date) return "";
  const dateObject = date instanceof Date ? date : new Date(date);

  // Menggunakan metode lokal, bukan toISOString() untuk menghindari masalah timezone
  const pad = (num) => num.toString().padStart(2, "0");
  return `${dateObject.getFullYear()}-${pad(dateObject.getMonth() + 1)}-${pad(dateObject.getDate())}`;
}
