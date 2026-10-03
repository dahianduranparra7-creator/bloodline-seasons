const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const ARCHIVO_MEMORIA = "./temporada.json";

let memoria = {
  temporada: null,
  activa: false,
  cambios: {}
};

// ===============================
// CARGAR MEMORIA
// ===============================

if (fs.existsSync(ARCHIVO_MEMORIA)) {
  try {
    memoria = JSON.parse(
      fs.readFileSync(ARCHIVO_MEMORIA, "utf8")
    );

    console.log("💾 Memoria cargada.");
  } catch (error) {
    console.log(
      "⚠️ No se pudo leer la memoria. Se creará una nueva."
    );
  }
}

// ===============================
// EMOJIS DE TEMPORADAS
// ===============================

const emojisTemporadas = {
  halloween: [
    "🎃", "👻", "🦇", "🕷️", "🕸️", "🧙", "🧙‍♀️",
    "🧛", "🧟", "🧟‍♀️", "🧞", "🧞‍♀️", "🤡", "😈",
    "👿", "💀", "☠️", "🐈‍⬛", "🐺", "🌙", "🪦",
    "🔮", "🧪", "🕯️", "🍬", "🍭", "🍫", "🖤", "🧡"
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
    "🌸", "🌷", "🌹", "🌺", "🌻", "🌼", "🪻",
    "🪷", "💐", "🌱", "🌿", "🍀", "☘️", "🦋",
    "🐝", "🐞", "🐛", "🐌", "🐰", "🐣", "🐥",
    "🌈", "☀️", "🌤️", "🌦️", "💚", "💛"
  ],

  sanPatricio: [
    "☘️", "🍀", "🌈", "💚", "🟢", "🧢"
  ],

  pascua: [
    "🐰", "🐣", "🐥", "🥚", "🌷", "🌸", "🌼",
    "💐", "🌱", "🪻", "💛", "💚", "💙", "🩷"
  ],

  anoNuevo: [
    "🎆", "🎇", "✨", "🎉", "🥳", "🎊", "⭐",
    "🌟", "💫", "🪩", "🎈"
  ],

  invierno: [
    "❄️", "☃️", "⛄", "🌨️", "🌬️", "🧣", "🧤",
    "🧥", "🥶", "🌙", "⭐", "✨", "🤍", "💙"
  ]
};

// ===============================
// NOMBRES
// ===============================

const nombresTemporadas = {
  halloween: "🎃 Halloween",
  navidad: "🎄 Navidad",
  sanValentin: "💖 San Valentín",
  verano: "☀️ Verano",
  primavera: "🌸 Primavera",
  sanPatricio: "☘️ San Patricio",
  pascua: "🐰 Pascua",
  anoNuevo: "🎆 Año Nuevo",
  invierno: "❄️ Invierno"
};

// ===============================
// GUARDAR MEMORIA
// ===============================

function guardarMemoria() {
  fs.writeFileSync(
    ARCHIVO_MEMORIA,
    JSON.stringify(memoria, null, 2)
  );

  console.log("💾 Memoria guardada.");
}

// ===============================
// CALCULAR PASCUA
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

  const month = Math.floor(
    (h + l - 7 * m + 114) / 31
  );

  const day =
    ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

// ===============================
// OBTENER TEMPORADA
// ===============================

function obtenerTemporada() {
  const ahora = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Santo_Domingo"
    })
  );

  const mes = ahora.getMonth() + 1;
  const dia = ahora.getDate();
  const año = ahora.getFullYear();

  if (mes === 1 && dia <= 7) {
    return "anoNuevo";
  }

  if (mes === 2 && dia >= 8 && dia <= 14) {
    return "sanValentin";
  }

  if (mes === 3 && dia >= 15 && dia <= 17) {
    return "sanPatricio";
  }

  const pascua = fechaPascua(año);

  const inicioPascua = new Date(pascua);
  inicioPascua.setDate(pascua.getDate() - 7);

  const finPascua = new Date(pascua);

  if (
    ahora >= inicioPascua &&
    ahora <= finPascua
  ) {
    return "pascua";
  }

  if (mes >= 3 && mes <= 5) {
    return "primavera";
  }

  if (mes >= 6 && mes <= 8) {
    return "verano";
  }

  if (mes === 10) {
    return "halloween";
  }

  if (mes === 12 && dia <= 25) {
    return "navidad";
  }

  return "invierno";
}

// ===============================
// EMOJI ALEATORIO
// ===============================

function emojiAleatorio(temporada) {
  const lista = emojisTemporadas[temporada];

  return lista[
    Math.floor(Math.random() * lista.length)
  ];
}

// ===============================
// MIEMBROS
// ===============================

async function todosLosMiembros(guild) {
  await guild.members.fetch();

  return guild.members.cache.filter(
    member => !member.user.bot
  );
}

// ===============================
// QUITAR EMOJI ANTERIOR
// ===============================

async function quitarEmojiAnterior(member) {
  try {
    const nombre = member.displayName;

    if (!nombre) return;

    const emojis = Object.values(
      emojisTemporadas
    ).flat();

    let nuevoNombre = nombre;

    for (const emoji of emojis) {
      nuevoNombre = nuevoNombre
        .replace(emoji, "")
        .trim();
    }

    if (nuevoNombre !== nombre) {
      await member.setNickname(nuevoNombre);
    }
  } catch (error) {
    console.log(
      `⚠️ No se pudo limpiar a ${member.user.username}: ${error.message}`
    );
  }
}

// ===============================
// PONER EMOJI
// ===============================

async function ponerEmoji(member, temporada) {
  try {
    await quitarEmojiAnterior(member);

    const emoji = emojiAleatorio(temporada);

    const nombreBase =
      member.displayName ||
      member.user.username;

    await member.setNickname(
      `${emoji} ${nombreBase}`
    );

    return emoji;

  } catch (error) {
    console.log(
      `⚠️ No se pudo cambiar a ${member.user.username}: ${error.message}`
    );

    return null;
  }
}

// ===============================
// REPARTIR TEMPORADA
// ===============================

async function repartirTemporada(
  guild,
  temporada
) {
  const miembros =
    await todosLosMiembros(guild);

  console.log(
    `🎭 Repartiendo emojis de ${nombresTemporadas[temporada]}...`
  );

  for (const member of miembros.values()) {
    await ponerEmoji(member, temporada);
  }

  console.log("✅ Emojis repartidos.");
}

// ===============================
// LIMPIAR EMOJIS
// ===============================

async function limpiarEmojis(guild) {
  const miembros =
    await todosLosMiembros(guild);

  console.log(
    "🧹 Limpiando emojis de la temporada anterior..."
  );

  for (const member of miembros.values()) {
    await quitarEmojiAnterior(member);
  }

  console.log(
    "✅ Emojis anteriores eliminados."
  );
}

// ===============================
// ANUNCIAR INICIO
// ===============================

async function anunciarInicio(
  guild,
  temporada
) {
  const miembros =
    await todosLosMiembros(guild);

  const mensaje =
    `༒ ${nombresTemporadas[temporada]} ha comenzado en Bloodline 🩸\n\n` +
    `🎭 Cada miembro tiene un emoji especial para esta temporada.\n` +
    `✨ ¡Disfruten la nueva temporada!`;

  for (const member of miembros.values()) {
    try {
      await member.send(mensaje);
    } catch {
      console.log(
        `⚠️ No se pudo enviar DM a ${member.user.username}`
      );
    }
  }
}

// ===============================
// ANUNCIAR FIN
// ===============================

async function anunciarFin(
  guild,
  temporada
) {
  const miembros =
    await todosLosMiembros(guild);

  const mensaje =
    `༒ La temporada ${nombresTemporadas[temporada]} ha terminado 🩸\n\n` +
    `✨ Gracias por participar en esta temporada de Bloodline.`;

  for (const member of miembros.values()) {
    try {
      await member.send(mensaje);
    } catch {
      console.log(
        `⚠️ No se pudo enviar DM a ${member.user.username}`
      );
    }
  }
}

// ===============================
// CUANDO EL BOT SE CONECTA
// ===============================

client.once("ready", async () => {

  console.log(
    `🩸 Bloodline Seasons conectado como ${client.user.tag}`
  );

  const temporadaActual =
    obtenerTemporada();

  console.log(
    `🌸 Temporada actual: ${temporadaActual}`
  );

  const guild =
    client.guilds.cache.first();

  if (!guild) {
    console.log(
      "❌ No se encontró el servidor."
    );

    process.exit(1);
  }

  // PRIMERA EJECUCIÓN
  if (memoria.temporada === null) {

    console.log(
      "🆕 Primera ejecución."
    );

    await repartirTemporada(
      guild,
      temporadaActual
    );

    memoria.temporada =
      temporadaActual;

    memoria.activa = true;

    memoria.cambios = {};

    guardarMemoria();

    console.log(
      "✅ Primera ejecución terminada."
    );

    process.exit(0);
  }

  // CAMBIO DE TEMPORADA
  if (
    memoria.temporada !==
    temporadaActual
  ) {

    console.log(
      `🔄 Cambio de temporada: ${memoria.temporada} → ${temporadaActual}`
    );

    await anunciarFin(
      guild,
      memoria.temporada
    );

    await limpiarEmojis(guild);

    await repartirTemporada(
      guild,
      temporadaActual
    );

    await anunciarInicio(
      guild,
      temporadaActual
    );

    memoria.temporada =
      temporadaActual;

    memoria.activa = true;

    memoria.cambios = {};

    guardarMemoria();

    console.log(
      "✅ Cambio de temporada terminado."
    );

    process.exit(0);
  }

  // MISMA TEMPORADA
  console.log(
    `✅ La temporada ${temporadaActual} continúa activa.`
  );

  guardarMemoria();

  console.log(
    "✅ Ejecución terminada."
  );

  process.exit(0);
});

// ===============================
// NUEVO MIEMBRO
// ===============================

client.on(
  "guildMemberAdd",
  async member => {

    const temporada =
      obtenerTemporada();

    try {

      const emoji =
        await ponerEmoji(
          member,
          temporada
        );

      memoria.cambios[
        member.id
      ] = temporada;

      guardarMemoria();

      await member.send(
        `༒ ¡Bienvenido a Bloodline! 🩸\n\n` +
        `🎭 Tu emoji de esta temporada es ${emoji}\n` +
        `✨ ¡Disfruta tu estadía en el clan!`
      );

    } catch (error) {

      console.log(
        `⚠️ Error dando bienvenida: ${error.message}`
      );
    }
  }
);

// ===============================
// COMANDO !EMOJI
// ===============================

client.on(
  "messageCreate",
  async message => {

    if (message.author.bot) {
      return;
    }

    if (
      message.content.toLowerCase() !==
      "!emoji"
    ) {
      return;
    }

    const temporada =
      obtenerTemporada();

    if (
      memoria.cambios[
        message.author.id
      ] === temporada
    ) {

      await message.reply(
        `❌ Ya cambiaste tu emoji durante la temporada de ${nombresTemporadas[temporada]}.`
      );

      return;
    }

    const member =
      message.guild.members.cache.get(
        message.author.id
      );

    if (!member) {
      return;
    }

    const emoji =
      await ponerEmoji(
        member,
        temporada
      );

    if (!emoji) {

      await message.reply(
        "❌ No pude cambiar tu emoji. Revisa que el bot tenga permiso para administrar apodos."
      );

      return;
    }

    memoria.cambios[
      message.author.id
    ] = temporada;

    guardarMemoria();

    await message.reply(
      `✨ Tu nuevo emoji de ${nombresTemporadas[temporada]} es ${emoji}`
    );
  }
);

// ===============================
// INICIAR BOT
// ===============================

client.login(
  process.env.DISCORD_TOKEN1
);
