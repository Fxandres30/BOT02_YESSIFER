// functions/eventoUtils.js

import { NUMERO_NOTIFICACION } from "./config.js";
import { supabase } from "./supabase.js";
import { ahoraColombia } from "./tiempoColombia.js";
import { normalizarTexto } from "./normalizarTexto.js";
import { LOTERIAS_ALIAS } from "./loterias.js";


// 🔥 CALCULAR CIERRE (5 min antes)
export function calcularCierre(horaFin) {
  const [h, m] = horaFin.split(":").map(Number);

  const fecha = ahoraColombia();
  fecha.setHours(h, m, 0, 0);

  const cierre = new Date(fecha.getTime() - (5 * 60 * 1000));

  return `${String(cierre.getHours()).padStart(2, "0")}:${String(cierre.getMinutes()).padStart(2, "0")}`;
}


// 🔓 ABRIR
export async function abrirGrupo(sock, grupoId) {
  try {
    await sock.groupSettingUpdate(grupoId, "not_announcement");
    console.log("🟢 Grupo abierto");
  } catch (err) {
    console.log("❌ No admin (no abre):", err?.message);
  }
}


// 🔒 CERRAR + BD
export async function cerrarGrupo(sock, grupoId) {
  try {
    await sock.groupSettingUpdate(grupoId, "announcement");

    await supabase
      .from("eventos_bot")
      .update({ estado: "cerrado" })
      .eq("grupo_id", grupoId)
      .eq("estado", "abierto");

    console.log("🔴 Grupo cerrado + BD actualizada");

  } catch (err) {
    console.log("❌ No admin o error cerrando:", err?.message);
  }
}


// ⏳ PROGRAMAR CIERRE
export function programarCierre(sock, grupoId, horaFin) {

  const ahora = ahoraColombia();

  const [h, m] = horaFin.split(":").map(Number);

  const evento = ahoraColombia();
  evento.setHours(h, m, 0, 0);

  const cierre = new Date(evento.getTime() - (2 * 60 * 1000));

  const delay = cierre.getTime() - ahora.getTime();

  if (delay <= 0) {
    cerrarGrupo(sock, grupoId);
    return;
  }

  setTimeout(async () => {
    try {
      await cerrarGrupo(sock, grupoId);
    } catch (err) {
      console.log("❌ Error en cierre programado:", err.message);
    }
  }, delay);
}


// 🔁 VERIFICAR CIERRES
export async function verificarCierres(sock) {
  try {

    const ahora = ahoraColombia();

    const { data: eventos, error } = await supabase
      .from("eventos_bot")
      .select("*")
      .eq("estado", "abierto");

    if (error) return;

    for (const ev of eventos) {

      if (!ev.hora_cierre) continue;

      const [h, m] = ev.hora_cierre.split(":").map(Number);

      const cierre = ahoraColombia();
      cierre.setHours(h, m, 0, 0);

      if (ahora >= cierre) {
        await cerrarGrupo(sock, ev.grupo_id);
      }
    }

  } catch {}
}


// 🔍 EXTRAER EVENTO PRO
export function extraerEventos(texto) {

  if (!texto) return null;

  const limpio = normalizarTexto(texto);

  // 🧠 detectar lotería
  let nombre = null;

  for (const [key, aliasList] of Object.entries(LOTERIAS_ALIAS)) {
    if (aliasList.some(a => limpio.includes(a))) {
      nombre = key;
      break;
    }
  }

  if (!nombre) return null;

  // 🕐 hora
  const match = limpio.match(/(\d{1,2})[:\s]?(\d{2})\s*(am|pm)/i);
  if (!match) return null;

  let [_, h, m, periodo] = match;
  h = parseInt(h);

  if (periodo === "pm" && h !== 12) h += 12;
  if (periodo === "am" && h === 12) h = 0;

  const hora = `${String(h).padStart(2, "0")}:${m}`;
  const horaCierre = calcularCierre(hora);

  // 💰 valor
  const valorMatch = limpio.match(/valor.*?(\d{3,})/i);
  const valor = valorMatch ? `$${valorMatch[1]}` : null;

  // 🏆 premios
  const premios = texto
    .split("\n")
    .map(l => l.trim())
    .filter(l => {
      const n = normalizarTexto(l);
      return (
        /\d{4,}/.test(n) &&
        (
          n.includes("cifra") ||
          n.includes("primera") ||
          n.includes("ultima")
        )
      );
    });

  if (!hora || !valor || premios.length === 0) return null;

  return {
    nombre: nombre.toUpperCase(),
    hora,
    horaCierre,
    valor,
    premios
  };
}


// 🔢 VALIDAR NÚMEROS
export function obtenerNumerosValidos() {
  if (!Array.isArray(NUMERO_NOTIFICACION)) return [];
  return NUMERO_NOTIFICACION.filter(n => n.includes("@s.whatsapp.net"));
}