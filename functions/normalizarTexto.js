export function normalizarTexto(texto = "") {
  return texto
    .toString()
    .toLowerCase()

    // 🔥 unificar AM/PM (CLAVE)
    .replace(/p\s*m/g, "pm")
    .replace(/a\s*m/g, "am")

    // 🔥 quitar tildes
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

    // 🔥 quitar emojis
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")

    // 🔥 quitar símbolos pero mantener números y espacios
    .replace(/[^a-z0-9\s]/g, " ")

    // 🔥 convertir separadores tipo 1.000 → 1000
    .replace(/\b(\d+)\s+(\d{3})\b/g, "$1$2")

    // 🔥 espacios múltiples
    .replace(/\s+/g, " ")
    .trim();
}