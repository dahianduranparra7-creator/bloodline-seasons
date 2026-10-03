const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ===============================
// 🎨 EMOJIS DE CADA TEMPORADA
// ===============================

const temporadas = {

  halloween: [
    "🎃", "👻", "🦇", "🕷️", "🕸️", "🧙", "🧙‍♀️",
    "🧛", "🧛‍♀️", "🧟", "🧟‍♀️", "🧞", "🧞‍♀️",
    "🤡", "😈", "👿", "💀", "☠️", "🐈‍⬛", "🐺",
    "🌙", "🪦", "🔮", "🧪", "🕯️", "🍬", "🍭",
    "🍫", "🖤", "🧡"
  ],

  navidad: [
    "🎄", "🎅", "🤶", "🧑‍🎄", "⛄", "☃️", "❄️",
    "🎁", "🎀", "🔔", "🦌", "🛷", "🧦", "🕯️",
    "✨", "🌟", "⭐", "🌲", "🧤", "🧣", "🍪",
    "🥛", "🍫", "🏠", "❤️", "💚", "🎶", "🔴", "🟢"
  ],

  sanValentin: [
    "❤️", "🩷", "🧡", "💛", "💚", "💙", "💜", "🖤",
    "🤍", "🤎", "💕", "💞", "💓", "💗", "💖", "💘",
    "💝", "💟", "❣️", "💌", "🥰", "😍", "😘", "🌹",
    "🌷", "💐", "🎀", "🫶", "💋"
  ],

  verano: [
    "☀️", "🌞", "🌴", "🌊", "🏖️", "🏝️", "🏄",
    "🏄‍♀️", "🏄‍♂️", "🏊", "🏊‍♀️", "🏊‍♂️", "🤿",
    "🩱", "🩳", "🩴", "🕶️", "👒", "🧢", "🏐",
    "⚽", "🐚", "🐠", "🐬", "🦀", "🦑", "🍉",
    "🍍", "🥥", "🍦", "🧃", "🥤"
  ],

  primavera: [
    "🌸", "🌷", "🌹", "🌺", "🌻", "🌼", "🪻", "🪷",
    "💐", "🌱", "🌿", "🍀", "☘️", "🦋", "🐝",
    "🐞", "🐛", "🐌", "🐰", "🐣", "🐥", "🌈",
    "☀️", "🌤️", "🌦️", "💚", "💛"
  ],

  sanPatricio: [
    "☘️", "🍀", "🌈", "💚", "🟢", "🧢", "🍺"
  ],

  pascua: [
    "🐰", "🐣", "🐥", "🥚", "🌷", "🌸", "🌼",
    "💐", "🌱", "🪻", "💛", "💚", "💙", "🩷"
  ],

  anoNuevo: [
    "🎆", "🎇", "✨", "🎉", "🥳", "🎊", "🍾",
    "🥂", "⭐", "🌟", "💫", "🪩", "🎈"
  ],

  invierno: [
    "❄️", "☃️", "⛄", "🌨️", "🌬️", "🧣", "🧤",
    "🧥", "🥶", "🌙", "⭐", "✨", "🤍", "💙"
  ]
};

// ===============================
// 📅 FECHA DE PASCUA
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
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, mes - 1, dia);
}

// ===============================
// 📅 OBTENER TEMPORADA
// ===============================

function obtenerTemporada() {

  const ahora = new Date();

  const fecha = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Santo_Domingo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(ahora);

  const year = Number(fecha.find(x => x.type === "year").value);
  const month = Number(fecha.find(x => x.type === "month").value);
  const day = Number(fecha.find(x => x.type === "day").value);

  // 🎆 Año Nuevo: 1 al 7 de enero
  if (month === 1 && day >= 1 && day <= 7) {
    return "anoNuevo";
  }

  // 💕 San Valentín: 8 al 14 de febrero
  if (month === 2 && day >= 8 && day <= 14) {
    return "sanValentin";
  }

  // ☘️ San Patricio: 15 al 17 de marzo
  if (month === 3 && day >= 15 && day <= 17) {
    return "sanPatricio";
  }

  // 🐰 Pascua
  const pascua = fechaPascua(year);

  const pascuaInicio = new Date(pascua);
  pascuaInicio.setDate(pascua.getDate() - 7);

  const fechaActual = new Date(year, month - 1, day);

  if (fechaActual >= pascuaInicio && fechaActual <= pascua) {
    return "pascua";
  }

  // 🌸 Primavera
  if (
    (month === 3 && day >= 18) ||
    month === 4 ||
    month === 5
  ) {
    return "primavera";
  }

  // ☀️ Verano
  if (month >= 6 && month <= 8) {
    return "verano";
  }

  // 🎃 Halloween
  if (month === 10) {
    return "halloween";
  }

  // 🎄 Navidad
  if (month === 12 && day >= 1 && day <= 25) {
    return "navidad";
  }

  // ❄️ Invierno
  return "invierno";
}

// ===============================
// 🎲 EMOJI ALEATORIO
// ===============================

function emojiAleatorio(temporada) {

  const lista = temporadas[temporada];

  return lista[Math.floor(Math.random() * lista.length)];
}

// ===============================
// 🧹 TODOS LOS EMOJIS DEL BOT
// ===============================

const todosLosEmojis = Object.values(temporadas).flat();

// ===============================
// 🧹 QUITAR EMOJI DEL BOT
// ===============================

function quitarEmojiAnterior(nombre) {

  if (!nombre) return nombre;

  const partes = nombre.trim().split(" ");

  if (todosLosEmojis.includes(partes[0])) {
    partes.shift();
  }

  return partes.join(" ").trim();
}

// ===============================
// 🎨 PONER EMOJI
// ===============================

async function ponerEmoji(member, temporada) {

  if (member.user.bot) return;

  // 👑 El dueño del servidor no puede ser modificado
  if (member.guild.ownerId === member.id) {
    console.log(`⚠️ ${member.user.username} es el propietario.`);
    return;
  }

  if (!member.manageable) {
    console.log(`⚠️ No puedo modificar a ${member.user.username}.`);
    return;
  }

  const nombreActual = member.nickname || member.user.username;

  const nombreLimpio = quitarEmojiAnterior(nombreActual);

  const emoji = emojiAleatorio(temporada);

  const nuevoNombre = `${emoji} ${nombreLimpio}`;

  try {

    await member.setNickname(
      nuevoNombre,
      `Bloodline Seasons - ${temporada}`
    );

    console.log(`✅ ${member.user.username} recibió ${emoji}`);

  } catch (error) {

    console.log(
      `❌ Error con ${member.user.username}: ${error.message}`
    );
  }
}

// ===============================
// 🎨 REPARTIR TEMPORADA
// ===============================

async function repartirTemporada(guild, temporada) {

  console.log(
    `👥 Repartiendo ${temporada} en ${guild.name}...`
  );

  const miembros = await guild.members.fetch();

  for (const member of miembros.values()) {

    await ponerEmoji(member, temporada);

  }

  console.log(
    `✅ Reparto terminado en ${guild.name}.`
  );
}

// ===============================
// 🧹 QUITAR EMOJIS
// ===============================

async function limpiarEmojis(guild) {

  console.log(
    `🧹 Quitando emojis de ${guild.name}...`
  );

  const miembros = await guild.members.fetch();

  for (const member of miembros.values()) {

    if (member.user.bot) continue;

    // 👑 No tocar al dueño
    if (member.guild.ownerId === member.id) {
      continue;
    }

    if (!member.manageable) {
      continue;
    }

    const nombreActual = member.nickname || member.user.username;

    const nombreLimpio = quitarEmojiAnterior(nombreActual);

    // Si no tenía emoji del bot, no hacemos nada
    if (nombreActual === nombreLimpio) {
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
        `❌ No pude limpiar a ${member.user.username}: ${error.message}`
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

  const temporadaActual = obtenerTemporada();

  console.log(
    `📅 Temporada actual: ${temporadaActual}`
  );

  for (const guild of client.guilds.cache.values()) {

    await repartirTemporada(
      guild,
      temporadaActual
    );
  }
});

// ===============================
// 👤 NUEVO MIEMBRO
// ===============================

client.on("guildMemberAdd", async (member) => {

  const temporadaActual = obtenerTemporada();

  console.log(
    `👤 ${member.user.username} entró durante ${temporadaActual}`
  );

  await ponerEmoji(
    member,
    temporadaActual
  );
});

// ===============================
// 🔐 INICIAR BOT
// ===============================

client.login(process.env.DISCORD_TOKEN);
