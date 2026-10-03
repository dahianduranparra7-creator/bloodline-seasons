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


/* =========================================================
   MEMORIA
   ========================================================= */

const archivoMemoria = "./temporada.json";

let memoria = {
  temporada: null,
  activa: false,
  cambios: {}
};

if (fs.existsSync(archivoMemoria)) {
  try {
    memoria = JSON.parse(
      fs.readFileSync(archivoMemoria, "utf8")
    );

    if (!memoria.cambios) {
      memoria.cambios = {};
    }

  } catch {
    memoria = {
      temporada: null,
      activa: false,
      cambios: {}
    };
  }
}

function guardarMemoria() {
  fs.writeFileSync(
    archivoMemoria,
    JSON.stringify(memoria, null, 2)
  );
}


/* =========================================================
   EMOJIS DE LAS TEMPORADAS
   ========================================================= */

const temporadas = {

  halloween: [
    "🎃", "👻", "🦇", "🕷️", "🕸️", "🧙", "🧙‍♀️",
    "🧛", "🧟", "🧟‍♀️", "🧞", "🧞‍♀️",
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
    "☘️", "🍀", "🌈", "💚", "🟢", "🧢"
  ],

  pascua: [
    "🐰", "🐣", "🐥", "🥚", "🌷", "🌸", "🌼",
    "💐", "🌱", "🪻", "💛", "💚", "💙", "🩷"
  ],

  anoNuevo: [
    "🎆", "🎇", "✨", "🎉", "🥳", "🎊",
    "⭐", "🌟", "💫", "🪩", "🎈"
  ],

  invierno: [
    "❄️", "☃️", "⛄", "🌨️", "🌬️", "🧣",
    "🧤", "🧥", "🥶", "🌙", "⭐", "✨", "🤍", "💙"
  ]

};


/* =========================================================
   NOMBRES DE LAS TEMPORADAS
   ========================================================= */

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


/* =========================================================
   FECHA DE PASCUA
   ========================================================= */

function fechaPascua(year) {

  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);

  const h =
    (19 * a + b - d - g + 15) % 30;

  const i = Math.floor(c / 4);
  const k = c % 4;

  const l =
    (32 + 2 * e + 2 * i - h - k) % 7;

  const m =
    Math.floor((a + 11 * h + 22 * l) / 451);

  const mes =
    Math.floor((h + l - 7 * m + 114) / 31);

  const dia =
    ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(
    Date.UTC(year, mes - 1, dia)
  );
}


/* =========================================================
   OBTENER TEMPORADA ACTUAL
   ========================================================= */

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


  /* Año Nuevo */

  if (month === 1 && day <= 7) {
    return "anoNuevo";
  }


  /* San Valentín */

  if (month === 2 && day >= 8 && day <= 14) {
    return "sanValentin";
  }


  /* San Patricio */

  if (month === 3 && day >= 15 && day <= 17) {
    return "sanPatricio";
  }


  /* Pascua */

  const pascua = fechaPascua(year);

  const inicioPascua = new Date(pascua);

  inicioPascua.setUTCDate(
    inicioPascua.getUTCDate() - 7
  );

  const hoyUTC = new Date(
    Date.UTC(year, month - 1, day)
  );

  if (
    hoyUTC >= inicioPascua &&
    hoyUTC <= pascua
  ) {
    return "pascua";
  }


  /* Primavera */

  if (
    (month === 3 && day >= 18) ||
    month === 4 ||
    month === 5
  ) {
    return "primavera";
  }


  /* Verano */

  if (
    month === 6 ||
    month === 7 ||
    month === 8
  ) {
    return "verano";
  }


  /* Halloween */

  if (month === 10) {
    return "halloween";
  }


  /* Navidad */

  if (
    month === 12 &&
    day >= 1 &&
    day <= 25
  ) {
    return "navidad";
  }


  /* Invierno */

  return "invierno";
}


/* =========================================================
   EMOJI ALEATORIO
   ========================================================= */

function emojiAleatorio(temporada) {

  const lista =
    temporadas[temporada];

  return lista[
    Math.floor(
      Math.random() * lista.length
    )
  ];
}


/* =========================================================
   TODOS LOS MIEMBROS
   ========================================================= */

async function todosLosMiembros(guild) {

  try {
    await guild.members.fetch();
  } catch (error) {
    console.log(
      "No se pudieron cargar todos los miembros:",
      error.message
    );
  }

  return guild.members.cache.filter(
    member => !member.user.bot
  );
}


/* =========================================================
   QUITAR EMOJI ANTERIOR
   ========================================================= */

async function quitarEmojiAnterior(member) {

  if (!member.nickname) {
    return;
  }

  try {

    let nombre =
      member.nickname;

    const emojis =
      Object.values(
        temporadas
      ).flat();

    for (const emoji of emojis) {

      if (
        nombre.startsWith(
          emoji + " "
        )
      ) {

        nombre =
          nombre.slice(
            emoji.length + 1
          );

        break;
      }

    }

    if (
      nombre !== member.nickname
    ) {

      await member.setNickname(
        nombre
      );

    }

  } catch (error) {

    console.log(
      `No se pudo quitar emoji a ${member.user.username}:`,
      error.message
    );

  }
}


/* =========================================================
   PONER EMOJI
   ========================================================= */

async function ponerEmoji(
  member,
  temporada,
  emojiPersonalizado = null
) {

  if (member.user.bot) {
    return;
  }

  try {

    await quitarEmojiAnterior(
      member
    );

    const emoji =
      emojiPersonalizado ||
      emojiAleatorio(temporada);

    const nombreBase =
      member.nickname ||
      member.user.username;

    let nuevoNombre =
      `${emoji} ${nombreBase}`;

    if (
      nuevoNombre.length > 32
    ) {

      nuevoNombre =
        nuevoNombre.substring(
          0,
          32
        );

    }

    await member.setNickname(
      nuevoNombre
    );

    return emoji;

  } catch (error) {

    console.log(
      `No se pudo cambiar el nombre de ${member.user.username}:`,
      error.message
    );

    return null;
  }
}


/* =========================================================
   REPARTIR TEMPORADA
   ========================================================= */

async function repartirTemporada(
  guild,
  temporada
) {

  const miembros =
    await todosLosMiembros(guild);

  for (
    const member
    of miembros.values()
  ) {

    await ponerEmoji(
      member,
      temporada
    );

  }
}


/* =========================================================
   LIMPIAR EMOJIS
   ========================================================= */

async function limpiarEmojis(
  guild
) {

  const miembros =
    await todosLosMiembros(guild);

  for (
    const member
    of miembros.values()
  ) {

    await quitarEmojiAnterior(
      member
    );

  }
}


/* =========================================================
   ANUNCIAR INICIO
   ========================================================= */

async function anunciarInicio(
  guild,
  temporada
) {

  const nombre =
    nombresTemporadas[temporada];

  const miembros =
    await todosLosMiembros(guild);

  for (
    const member
    of miembros.values()
  ) {

    try {

      await member.send(
        `✨ ¡Nueva temporada en Bloodline! ✨\n\n` +
        `La temporada de **${nombre}** ha comenzado. 🎉\n\n` +
        `Tu nombre recibió un emoji de esta temporada.\n\n` +
        `📝 Si quieres cambiarlo, usa **!emoji** en el servidor.\n` +
        `⚠️ Solo podrás cambiar tu emoji **una vez durante esta temporada**.`
      );

    } catch (error) {

      console.log(
        `No se pudo enviar DM a ${member.user.username}.`
      );

    }
  }
}


/* =========================================================
   ANUNCIAR FIN
   ========================================================= */

async function anunciarFin(
  guild,
  temporada
) {

  const nombre =
    nombresTemporadas[temporada];

  const miembros =
    await todosLosMiembros(guild);

  for (
    const member
    of miembros.values()
  ) {

    try {

      await member.send(
        `🍂 La temporada de **${nombre}** ha terminado.\n\n` +
        `Gracias por participar en esta temporada de Bloodline. ❤️\n\n` +
        `Prepárate para el próximo cambio de temporada. ✨`
      );

    } catch (error) {

      console.log(
        `No se pudo enviar DM a ${member.user.username}.`
      );

    }
  }
}


/* =========================================================
   NUEVO MIEMBRO
   ========================================================= */

client.on(
  "guildMemberAdd",
  async member => {

    if (member.user.bot) {
      return;
    }

    const temporada =
      obtenerTemporada();

    const emoji =
      await ponerEmoji(
        member,
        temporada
      );

    if (emoji) {

      try {

        await member.send(
          `༒ ¡Bienvenido a **Bloodline**! 🩸\n\n` +
          `Tu emoji de la temporada **${nombresTemporadas[temporada]}** es ${emoji}.\n\n` +
          `Si quieres cambiarlo, puedes usar **!emoji** en el servidor.\n` +
          `⚠️ Recuerda: solo tienes **un cambio por temporada**.`
        );

      } catch (error) {

        console.log(
          `No se pudo enviar bienvenida a ${member.user.username}.`
        );

      }
    }
  }
);


/* =========================================================
   COMANDO !EMOJI
   ========================================================= */

client.on(
  "messageCreate",
  async message => {

    if (message.author.bot) {
      return;
    }

    if (
      message.content.toLowerCase()
      !== "!emoji"
    ) {
      return;
    }

    const member =
      message.member;

    if (!member) {
      return;
    }

    const temporada =
      obtenerTemporada();


    /* Ya utilizó su cambio */

    if (
      memoria.cambios[member.id]
      === temporada
    ) {

      await message.reply(
        `❌ Ya cambiaste tu emoji durante la temporada de **${nombresTemporadas[temporada]}**.\n\n` +
        `Tendrás otra oportunidad cuando comience la próxima temporada. ⏳`
      );

      return;
    }


    /* Elegir emoji */

    const emoji =
      emojiAleatorio(
        temporada
      );


    /* Cambiar emoji */

    const resultado =
      await ponerEmoji(
        member,
        temporada,
        emoji
      );

    if (!resultado) {

      await message.reply(
        `❌ No pude cambiar tu emoji.`
      );

      return;
    }


    /* Guardar cambio */

    memoria.cambios[
      member.id
    ] = temporada;

    guardarMemoria();


    await message.reply(
      `✅ ¡Listo, ${member.user.username}!\n\n` +
      `Tu nuevo emoji es ${emoji}.\n` +
      `⚠️ Ya utilizaste tu cambio de esta temporada.`
    );

  }
);


/* =========================================================
   BOT LISTO
   ========================================================= */

client.once(
  "ready",
  async () => {

    console.log(
      `🩸 Bloodline Seasons conectado como ${client.user.tag}`
    );

    const temporadaActual =
      obtenerTemporada();

    console.log(
      `🌸 Temporada actual: ${temporadaActual}`
    );


    /* =====================================================
       PRIMERA EJECUCIÓN
       ===================================================== */

    if (!memoria.temporada) {

      console.log(
        "🎉 Primera ejecución del bot."
      );

      memoria.temporada =
        temporadaActual;

      memoria.activa =
        true;

      memoria.cambios =
        {};

      guardarMemoria();


      for (
        const guild
        of client.guilds.cache.values()
      ) {

        await repartirTemporada(
          guild,
          temporadaActual
        );

        await anunciarInicio(
          guild,
          temporadaActual
        );

      }

      return;
    }


    /* =====================================================
       CAMBIO DE TEMPORADA
       ===================================================== */

    if (
      memoria.temporada
      !== temporadaActual
    ) {

      console.log(
        `🔄 Cambio de temporada: ${memoria.temporada} → ${temporadaActual}`
      );


      for (
        const guild
        of client.guilds.cache.values()
      ) {

        await anunciarFin(
          guild,
          memoria.temporada
        );


        await limpiarEmojis(
          guild
        );


        await repartirTemporada(
          guild,
          temporadaActual
        );


        await anunciarInicio(
          guild,
          temporadaActual
        );

      }


      memoria.temporada =
        temporadaActual;

      memoria.activa =
        true;

      memoria.cambios =
        {};

      guardarMemoria();

      return;
    }


    /* =====================================================
       MISMA TEMPORADA
       ===================================================== */

    console.log(
      `✅ La temporada ${temporadaActual} continúa activa.`
    );

    memoria.activa =
      true;

    guardarMemoria();

  }
);


/* =========================================================
   LOGIN
   ========================================================= */

client.login(
  process.env.DISCORD_TOKEN1
);
