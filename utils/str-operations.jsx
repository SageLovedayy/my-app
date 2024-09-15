export default function normalizeString(str) {
  return str
    .normalize("NFD") // Normalize special characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9\-_]/g, ""); // Keep underscores, hyphens, letters, and numbers
}
