// mensajes.js

export const mensajesTodosLibres = [
  "☑️ 𝐑𝐄𝐒𝐄𝐑𝐕𝐀 𝐄𝐗𝐈𝐓𝐎𝐒𝐀\n\n                  ⋆ 𝐘&𝐕 ⋆",
  "🔒 𝐍𝐔́𝐌𝐄𝐑𝐎𝐒 𝐀𝐒𝐈𝐆𝐍𝐀𝐃𝐎𝐒\n\n                  ⋆ 𝐘&𝐕 ⋆",
  "🕒 𝐑𝐄𝐒𝐄𝐑𝐕𝐀 𝐂𝐎𝐍𝐅𝐈𝐑𝐌𝐀𝐃𝐀\n\n                  ⋆ 𝐘&𝐕 ⋆"

];

export const mensajesTodosOcupados = [
  "🚫 𝐍𝐨 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞𝐬 🟥\n\n        ⋆ 𝐘&𝐕 ⋆"
];


// 🔥 NUEVO SOLO PARA ESOS 2 RENGLONES (MISMA TIPOGRAFÍA)

export const encabezadosReservados = [
  "𝐍𝐔𝐌𝐄𝐑𝐎𝐒 𝐑𝐄𝐒𝐄𝐑𝐕𝐀𝐃𝐎𝐒: *( {numeros} ).* ✅",
  "𝐄𝐒𝐓𝐎𝐒 𝐘𝐀 𝐒𝐎𝐍 𝐓𝐔𝐘𝐎𝐒 *( {numeros} ). ✅*",
  "𝐍𝐔𝐌𝐄𝐑𝐎𝐒 𝐑𝐄𝐒𝐄𝐑𝐕𝐀𝐃𝐎𝐒 𝐂𝐎𝐑𝐑𝐄𝐂𝐓𝐀𝐌𝐄𝐍𝐓𝐄 *( {numeros} )*. ✅",
  "𝐐𝐔𝐄𝐃𝐀𝐒 𝐂𝐎𝐍 𝐄𝐋 *( {numeros} )* 𝐍𝐔𝐌𝐄𝐑𝐎𝐒 𝐑𝐄𝐒𝐄𝐑𝐕𝐀𝐃𝐎𝐒. ✅"
];

export const encabezadosOcupados = [
  "𝐍𝐎 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒: *( {numeros} ).* ❌",
  "𝐘𝐀 𝐅𝐔𝐄𝐑𝐎𝐍 𝐓𝐎𝐌𝐀𝐃𝐎𝐒 *( {numeros} ). 🚫*"
];


export function mensajeAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}
