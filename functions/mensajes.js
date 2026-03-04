// mensajes.js

export const mensajesTodosLibres = [
  "☑️ 𝐑𝐄𝐒𝐄𝐑𝐕𝐀 𝐄𝐗𝐈𝐓𝐎𝐒𝐀\n\n                  ⋆ 𝐘&𝐕 ⋆",
  "🔒 𝐍𝐔́𝐌𝐄𝐑𝐎𝐒 𝐀𝐒𝐈𝐆𝐍𝐀𝐃𝐎𝐒\n\n                  ⋆ 𝐘&𝐕 ⋆",
  "🕒 𝐑𝐄𝐒𝐄𝐑𝐕𝐀 𝐂𝐎𝐍𝐅𝐈𝐑𝐌𝐀𝐃𝐀\n\n                  ⋆ 𝐘&𝐕 ⋆"

];

export const mensajesTodosOcupados = [
  "🚫 𝐍𝐨 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞𝐬 🟥\n\n        ⋆ 𝐘&𝐕 ⋆"
];

export function mensajeAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}
