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
    "🏊‍♂️","🤿","🩱","🩳","🩴","🕶️","👒","🧢","🏐","⚽","🏄‍♂️",
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
    "🍀","☘️","🌈","💚","🟢","☘️","🪙","🍺","🎩","🧙","🌿","🌱",
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
    "🥳","🎓","📜","💯","🧠","💙","💜","💚","🩷","🩵"
  ],

  invierno: [
    "❄️","☃️","⛄","🌨️","🌬️","🧣","🧤","🧥","🧦","🧊","🏔️","🌨️",
    "☕","🍫","🔥","🕯️","🌙","⭐","✨","🤍","🩵","💙"
  ]
};

// 🎯 TEMPORADA ACTUAL
// Por ahora la dejamos manual para que podamos elegirla fácilmente.
let temporadaActual = "halloween";

// 🎲 Elegir emoji al azar
function emojiAleatorio() {
  const lista = temporadas[temporadaActual];
  return lista[Math.floor(Math.random() * lista.length)];
}

// 🤖 Bot conectado
client.once("ready", () => {
  console.log(`🩸 Bloodline Seasons conectado como ${client.user.tag}`);
  console.log(`🎨 Temporada actual: ${temporadaActual}`);
});

// 👤 Cuando entra una persona nueva
client.on("guildMemberAdd", async (member) => {
  try {
    const emoji = emojiAleatorio();
    const nuevoApodo = `${emoji} ${member.user.username}`;

    await member.setNickname(nuevoApodo);

    console.log(`✅ ${member.user.username} recibió ${emoji}`);
  } catch (error) {
    console.error(
      `❌ No pude cambiar el apodo de ${member.user.username}:`,
      error
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
