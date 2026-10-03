const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const fs = require("fs");

// ===============================
// 🤖 CLIENTE
// ===============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ===============================
// 💾 ARCHIVO DE MEMORIA
// ===============================

const archivoMemoria = "./temporada.json";

let memoria = {
  temporada: null,
  activa: false
};

if (fs.existsSync(archivoMemoria)) {
  try {
    memoria = JSON.parse(
      fs.readFileSync(archivoMemoria, "utf8")
    );
  } catch {
    memoria = {
      temporada: null,
      activa: false
    };
  }
}

function guardarMemoria() {
  fs.writeFileSync(
    archivoMemoria,
    JSON.stringify(memoria, null, 2)
  );
}

// ===============================
// 🎨 EMOJIS
// ===============================

const temporadas = {

  halloween: [
    "🎃","👻","🦇","🕷️","🕸️","🧙","🧙‍♀️",
    "🧛","🧛‍♀️","🧟","🧟‍♀️","🧞","🧞‍♀️",
    "🤡","😈","👿","💀","☠️","🐈‍⬛","🐺",
    "🌙","🪦","🔮","🧪","🕯️","🍬","🍭",
    "🍫","🖤","🧡"
  ],

  navidad: [
    "🎄","🎅","🤶","🧑‍🎄","⛄","☃️","❄️",
    "🎁","🎀","🔔","🦌","🛷","🧦","🕯️",
    "✨","🌟","⭐","🌲","🧤","🧣","🍪",
    "🥛","🍫","🏠","❤️","💚","🎶","🔴","🟢"
  ],

  sanValentin: [
    "❤️","🩷","🧡","💛","💚","💙","💜","🖤",
    "🤍","🤎","💕","💞","💓","💗","💖","💘",
    "💝","💟","❣️","💌","🥰","😍","😘","🌹",
    "🌷","💐","🎀","🫶","💋"
  ],

  verano: [
    "☀️","🌞","🌴","🌊","🏖️","🏝️","🏄",
    "🏄‍♀️","🏄‍♂️","🏊","🏊‍♀️","🏊‍♂️","🤿",
    "🩱","🩳","🩴","🕶️","👒","🧢","🏐",
    "⚽","🐚","🐠","🐬","🦀","🦑","🍉",
    "🍍","🥥","🍦","🧃","🥤"
  ],

  primavera: [
    "🌸","🌷","🌹","🌺","🌻","🌼","🪻","🪷",
    "💐","🌱","🌿","🍀","☘️","🦋","🐝",
    "🐞","🐛","🐌","🐰","🐣","🐥","🌈",
    "☀️","🌤️","🌦️","💚","💛"
  ],

  sanPatricio: [
    "☘️","🍀","🌈","💚","🟢","🧢"
  ],

  pascua: [
    "🐰","🐣","🐥","🥚","🌷","🌸","🌼",
    "💐","🌱","🪻","💛","💚","💙","🩷"
  ],

  anoNuevo: [
    "🎆","🎇","✨","🎉","🥳","🎊",
    "⭐","🌟","💫","🪩","🎈"
  ],

  invierno: [
    "❄️","☃️","⛄","🌨️","🌬️","🧣",
    "🧤","🧥","🥶","🌙","⭐","✨","🤍","💙"
  ]
};

// ===============================
// 📅 PASCUA
// ===============================

function fechaPascua(year) {

  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);

  const mes = Math.floor(
    (h + l - 7 * m + 114) / 31
  );

  const dia =
    ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, mes - 1, dia);
}

// ===============================
// 📅 TEMPORADA ACTUAL
// ===============================

function obtenerTemporada() {

  const ahora = new Date();

  const partes = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "America/Santo_Domingo",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }
  ).formatToParts(ahora);

  const year = Number(
    partes.find(p => p.type === "year").value
  );

  const month = Number(
    partes.find(p => p.type === "month").value
  );

  const day = Number(
    partes.find(p => p.type === "day").value
  );

  // 🎆 AÑO NUEVO
  if (month === 1 && day >= 1 && day <= 7) {
    return "anoNuevo";
  }

  // 💕 SAN VALENTÍN
  if (month === 2 && day >= 8 && day <= 14) {
    return "sanValentin";
  }

  // ☘️ SAN PATRICIO
  if (month === 3 && day >= 15 && day <= 17) {
    return "sanPatricio";
  }

  // 🐰 PASCUA
  const pascua = fechaPascua(year);

  const inicioPascua = new Date(pascua);
  inicioPascua.setDate(
    pascua.getDate() - 7
  );

  const actual = new Date(
    year,
    month - 1,
    day
  );

  if (
    actual >= inicioPascua &&
    actual <= pascua
  ) {
    return "pascua";
  }

  // 🌸 PRIMAVERA
  if (
    (month === 3 && day >= 18) ||
    month === 4 ||
    month === 5
  ) {
    return "primavera";
  }

  // ☀️ VERANO
  if (month >= 6 && month <= 8) {
    return "verano";
  }

  // 🎃 HALLOWEEN
  if (month === 10) {
    return "halloween";
  }

  // 🎄 NAVIDAD
  if (
    month === 12 &&
    day >= 1 &&
    day <= 25
  ) {
    return "navidad";
  }

  // ❄️ INVIERNO
  return "invierno";
}

// ===============================
// 🎲 EMOJI ALEATORIO
// ===============================

function emojiAleatorio(temporada) {

  const lista = temporadas[temporada];

  return lista[
    Math.floor(Math.random() * lista.length)
  ];
}

// ===============================
// 🧹 EMOJIS DEL BOT
// ===============================

const todosLosEmojis =
  Object.values(temporadas).flat();

// ===============================
// 🧹 QUITAR EMOJI ANTERIOR
// ===============================

function quitarEmojiAnterior(nombre) {

  if (!nombre) return nombre;

  const partes = nombre
    .trim()
    .split(" ");

  if (
    todosLosEmojis.includes(partes[0])
  ) {
    partes.shift();
  }

  return partes.join(" ").trim();
}

// ===============================
// 🎨 PONER EMOJI
// ===============================

async function ponerEmoji(
  member,
  temporada
) {

  if (member.user.bot) return;

  // 👑 NO TOCAR AL DUEÑO
  if (
    member.guild.ownerId === member.id
  ) {
    console.log(
      `⚠️ ${member.user.username} es el propietario.`
    );
    return;
  }

  if (!member.manageable) {
    console.log(
      `⚠️ No puedo modificar a ${member.user.username}.`
    );
    return;
  }

  const nombreActual =
    member.nickname ||
    member.user.username;

  const nombreLimpio =
    quitarEmojiAnterior(nombreActual);

  const emoji =
    emojiAleatorio(temporada);

  const nuevoNombre =
    `${emoji} ${nombreLimpio}`;

  try {

    await member.setNickname(
      nuevoNombre,
      `Bloodline Seasons - ${temporada}`
    );

    console.log(
      `✅ ${member.user.username} recibió ${emoji}`
    );

  } catch (error) {

    console.log(
      `❌ Error con ${member.user.username}: ${error.message}`
    );
  }
}

// ===============================
// 🎨 REPARTIR
// ===============================

async function repartirTemporada(
  guild,
  temporada
) {

  console.log(
    `🎨 Repartiendo ${temporada} en ${guild.name}...`
  );

  const miembros =
    await guild.members.fetch();

  for (
    const member of miembros.values()
  ) {

    await ponerEmoji(
      member,
      temporada
    );
  }

  console.log(
    `✅ Reparto terminado en ${guild.name}.`
  );
}

// ===============================
// 🧹 LIMPIAR
// ===============================

async function limpiarEmojis(guild) {

  console.log(
    `🧹 Limpiando emojis en ${guild.name}...`
  );

  const miembros =
    await guild.members.fetch();

  for (
    const member of miembros.values()
  ) {

    if (member.user.bot) continue;

    if (
      member.guild.ownerId === member.id
    ) {
      continue;
    }

    if (!member.manageable) {
      continue;
    }

    const nombreActual =
      member.nickname ||
      member.user.username;

    const nombreLimpio =
      quitarEmojiAnterior(nombreActual);

    if (
      nombreActual === nombreLimpio
    ) {
      continue;
    }

    try {

      await member.setNickname(
        nombreLimpio,
        "Bloodline Seasons - Fin de temporada"
      );

      console.log(
        `🧹 Emoji eliminado de ${member.user.username}`
      );

    } catch (error) {

      console.log(
        `❌ Error limpiando ${member.user.username}: ${error.message}`
      );
    }
  }

  console.log(
    `✅ Limpieza terminada en ${guild.name}.`
  );
}

// ===============================
// 🚀 BOT LISTO
// ===============================

client.once("ready", async () => {

  console.log(
    `🩸 Bloodline Seasons conectado como ${client.user.tag}`
  );

  const temporadaActual =
    obtenerTemporada();

  console.log(
    `📅 Temporada actual: ${temporadaActual}`
  );

  // ===============================
  // 🆕 PRIMERA VEZ
  // ===============================

  if (!memoria.temporada) {

    console.log(
      `🆕 Primera ejecución. Activando ${temporadaActual}.`
    );

    memoria.temporada =
      temporadaActual;

    memoria.activa = true;

    guardarMemoria();

    for (
      const guild of client.guilds.cache.values()
    ) {

      await repartirTemporada(
        guild,
        temporadaActual
      );
    }

    return;
  }

  // ===============================
  // 🔄 CAMBIÓ LA TEMPORADA
  // ===============================

  if (
    memoria.temporada !==
    temporadaActual
  ) {

    console.log(
      `🔄 Cambio: ${memoria.temporada} → ${temporadaActual}`
    );

    // 🧹 Primero limpia la anterior
    for (
      const guild of client.guilds.cache.values()
    ) {

      await limpiarEmojis(guild);
    }

    // 🎨 Guarda la nueva
    memoria.temporada =
      temporadaActual;

    memoria.activa = true;

    guardarMemoria();

    // 🎨 Reparte la nueva
    for (
      const guild of client.guilds.cache.values()
    ) {

      await repartirTemporada(
        guild,
        temporadaActual
      );
    }

    return;
  }

  // ===============================
  // 🔁 MISMA TEMPORADA
  // ===============================

  console.log(
    `⏸️ ${temporadaActual} ya está activa. No se vuelve a repartir.`
  );
});

// ===============================
// 👤 NUEVO MIEMBRO
// ===============================

client.on(
  "guildMemberAdd",
  async (member) => {

    const temporadaActual =
      obtenerTemporada();

    // Solo recibe emoji si estamos
    // dentro de una temporada activa

    if (
      memoria.temporada ===
      temporadaActual &&
      memoria.activa
    ) {

      console.log(
        `👤 Nuevo miembro: ${member.user.username}`
      );

      await ponerEmoji(
        member,
        temporadaActual
      );
    }
  }
);

// ===============================
// 🔐 LOGIN
// ===============================

client.login(
  process.env.DISCORD_TOKEN
);
