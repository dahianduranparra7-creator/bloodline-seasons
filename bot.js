const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// 🎨 EMOJIS DE CADA TEMPORADA
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

// 🎯 TEMPORADA ACTUAL
let temporadaActual = "halloween";

// 🎲 Elegir emoji al azar
function emojiAleatorio() {
  const lista = temporadas[temporadaActual];
  return lista[Math.floor(Math.random() * lista.length)];
}

// 🏷️ Poner emoji al miembro
async function ponerEmoji(member) {
  try {
    // No modificar al propio bot
    if (member.user.bot) return;

    const emoji = emojiAleatorio();

    // Usamos el nombre actual del miembro
    const nombre = member.nickname || member.user.username;

    const nuevoApodo = `${emoji} ${nombre}`;

    await member.setNickname(nuevoApodo);

    console.log(`✅ ${nombre} recibió ${emoji}`);
  } catch (error) {
    console.error(
      `❌ No pude cambiar el apodo de ${member.user.username}:`,
      error.message
    );
  }
}

// 🤖 Bot conectado
client.once("ready", async () => {
  console.log(`🩸 Bloodline Seasons conectado como ${client.user.tag}`);
  console.log(`🎨 Temporada actual: ${temporadaActual}`);

  // 👥 Buscar el servidor donde está el bot
  for (const guild of client.guilds.cache.values()) {
    console.log(`👥 Revisando miembros de ${guild.name}...`);

    try {
      // Obtener los miembros actuales del servidor
      const miembros = await guild.members.fetch();

      for (const member of miembros.values()) {
        await ponerEmoji(member);
      }

      console.log(`✅ Miembros de ${guild.name} revisados.`);
    } catch (error) {
      console.error(`❌ Error revisando ${guild.name}:`, error);
    }
  }
});

// 🆕 Cuando entra una persona nueva
client.on("guildMemberAdd", async (member) => {
  await ponerEmoji(member);
});

client.login(process.env.DISCORD_TOKEN);
