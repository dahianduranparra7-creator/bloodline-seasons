const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// 🎨 EMOJIS
const temporadas = {
  halloween: [
    "🎃","👻","🦇","🕷️","🕸️","🧙","🧙‍♀️","🧛","🧛‍♀️","🧟","🧟‍♀️",
    "🧞","🧞‍♀️","🤡","😈","👿","💀","☠️","🐈‍⬛","🐺","🌙","🪦",
    "🔮","🧪","🕯️","🍬","🍭","🍫","🖤","🧡"
  ],

  navidad: [
    "🎄","🎅","🤶","🧑‍🎄","⛄","☃️","❄️","🎁","🎀","🔔","🦌","🛷",
    "🧦","🕯️","✨","🌟","⭐","🌲","🧤","🧣","🍪","🥛","🍫","🏠",
    "❤️","💚","🎶","🔴","🟢"
  ],

  sanValentin: [
    "❤️","🩷","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💕","💞",
    "💓","💗","💖","💘","💝","💟","❣️","💌","🥰","😍","😘","🌹",
    "🌷","💐","🎀","🫶","💋"
  ],

  verano: [
    "☀️","🌞","🌴","🌊","🏖️","🏝️","🏄","🏄‍♀️","🏄‍♂️","🏊","🏊‍♀️",
    "🏊‍♂️","🤿","🩱","🩳","🩴","🕶️","👒","🧢","🏐","⚽",
    "🐚","🐠","🐬","🦀","🦑","🍉","🍍","🥥","🍦","🧃","🥤"
  ],

  primavera: [
    "🌸","🌷","🌹","🌺","🌻","🌼","🪻","🪷","💐","🌱","🌿","🍀",
    "☘️","🦋","🐝","🐞","🐛","🐌","🐰","🐣","🐥","🌈","☀️","🌤️",
    "🌦️","💚","💛"
  ],

  pascua: [
    "🐰","🐇","🥚","🐣","🐥","🌷","🌸","🌼","🌺","🌹","💐","🪻",
    "🪷","🍫","🍬","🍭","🎀","💜","💛","💚","🩷","💙","🧺"
  ],

  sanPatricio: [
    "🍀","☘️","🌈","💚","🟢","🪙","🎩","🧙","🌿","🌱",
    "💰","✨","⭐","🇮🇪"
  ],

  anoNuevo: [
    "🎆","🎇","✨","🎉","🎊","🥳","🍾","🥂","🎈","🪩","⭐","🌟",
    "💫","🎵","🕺","💃","🕛","❤️","💛","💚","💙","💜","🩷"
  ],

  cumpleanos: [
    "🎂","🎉","🎊","🎈","🎁","🧁","🍰","🍭","🍬","🎀","✨","🥳",
    "🎵","🎶","🪩","🌟","⭐","💖","💝","🩷","🩵","💜"
  ],

  graduacion: [
    "🎓","📚","📖","✏️","📝","🏆","🎉","🎊","🎈","✨","🌟","⭐",
    "🥳","📜","💯","🧠","💙","💜","💚","🩷","🩵"
  ],

  invierno: [
    "❄️","☃️","⛄","🌨️","🌬️","🧣","🧤","🧥","🧦","🧊","🏔️",
    "☕","🍫","🔥","🕯️","🌙","⭐","✨","🤍","🩵","💙"
  ]
};

// 📅 CALCULAR PASCUA
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

// 📅 SABER QUÉ TEMPORADA ES
function obtenerTemporada() {
  const ahora = new Date();

  const fechaRD = new Date(
    ahora.toLocaleString("en-US", {
      timeZone: "America/Santo_Domingo"
    })
  );

  const mes = fechaRD.getMonth() + 1;
  const dia = fechaRD.getDate();
  const año = fechaRD.getFullYear();

  // 🎆 Año Nuevo
  if (mes === 1 && dia <= 7) {
    return "anoNuevo";
  }

  // 💕 San Valentín
  if (mes === 2 && dia >= 8 && dia <= 14) {
    return "sanValentin";
  }

  // ☘️ San Patricio
  if (mes === 3 && dia >= 15 && dia <= 17) {
    return "sanPatricio";
  }

  // 🐰 Pascua
  const pascua = fechaPascua(año);
  const inicioPascua = new Date(pascua);
  inicioPascua.setDate(inicioPascua.getDate() - 7);

  if (fechaRD >= inicioPascua && fechaRD <= pascua) {
    return "pascua";
  }

  // 🌸 Primavera
  if (
    (mes === 3 && dia >= 18) ||
    mes === 4 ||
    mes === 5 ||
    mes === 9
  ) {
    return "primavera";
  }

  // ☀️ Verano
  if (mes >= 6 && mes <= 8) {
    return "verano";
  }

  // 🎃 Halloween
  if (mes === 10) {
    return "halloween";
  }

  // 🎄 Navidad
  if (mes === 12 && dia <= 25) {
    return "navidad";
  }

  // ❄️ Invierno
  return "invierno";
}

// 🎲 EMOJI ALEATORIO
function emojiAleatorio(temporada) {
  const lista = temporadas[temporada];

  return lista[Math.floor(Math.random() * lista.length)];
}

// 📋 TODOS LOS EMOJIS
const todosLosEmojis = Object.values(temporadas).flat();

// 🏷️ QUITAR EMOJI ANTERIOR
function quitarEmojiAnterior(nombre) {
  const partes = nombre.trim().split(" ");

  if (todosLosEmojis.includes(partes[0])) {
    partes.shift();
  }

  return partes.join(" ").trim();
}

// 🏷️ CAMBIAR APODO
async function ponerEmoji(member, temporada) {
  try {
    if (member.user.bot) return;

    // 👑 No tocar al propietario
    if (member.id === member.guild.ownerId) {
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

    const nuevoApodo = `${emoji} ${nombreLimpio}`;

    await member.setNickname(nuevoApodo);

    console.log(`✅ ${nombreLimpio} recibió ${emoji}`);

  } catch (error) {
    console.error(
      `❌ No pude cambiar el apodo de ${member.user.username}:`,
      error.message
    );
  }
}

// 👥 REPARTIR A TODOS
async function repartirTemporada(guild, temporada) {
  console.log(`👥 Repartiendo ${temporada} en ${guild.name}...`);

  try {
    const miembros = await guild.members.fetch();

    for (const member of miembros.values()) {
      await ponerEmoji(member, temporada);
    }

    console.log(`✅ Reparto terminado en ${guild.name}.`);

  } catch (error) {
    console.error(`❌ Error repartiendo emojis:`, error);
  }
}

// 🎯 TEMPORADA ANTERIOR
let temporadaActual = null;

// 🤖 BOT CONECTADO
client.once("ready", async () => {

  console.log(`🩸 Bloodline Seasons conectado como ${client.user.tag}`);

  temporadaActual = obtenerTemporada();

  console.log(`🎨 Temporada actual: ${temporadaActual}`);

  for (const guild of client.guilds.cache.values()) {
    await repartirTemporada(guild, temporadaActual);
  }

  // ⏰ Revisar la fecha cada 10 minutos
  setInterval(async () => {

    const nuevaTemporada = obtenerTemporada();

    if (nuevaTemporada !== temporadaActual) {

      console.log(
        `🔄 Cambio de temporada: ${temporadaActual} → ${nuevaTemporada}`
      );

      temporadaActual = nuevaTemporada;

      for (const guild of client.guilds.cache.values()) {
        await repartirTemporada(guild, nuevaTemporada);
      }

    }

  }, 10 * 60 * 1000);
});

// 🆕 NUEVO MIEMBRO
client.on("guildMemberAdd", async (member) => {

  const temporada = obtenerTemporada();

  await ponerEmoji(member, temporada);

});

client.login(process.env.DISCORD_TOKEN);
