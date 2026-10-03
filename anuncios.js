async function anunciarNuevaTemporada(guild, temporada, resultados) {
  // Buscar canal de anuncios
  const canal =
    guild.channels.cache.find(
      c =>
        c.name === "anuncios" &&
        c.isTextBased()
    );

  const nombres = {
    halloween: "🎃 Halloween",
    navidad: "🎄 Navidad",
    sanValentin: "💘 San Valentín",
    verano: "☀️ Verano",
    primavera: "🌸 Primavera",
    sanPatricio: "☘️ San Patricio",
    pascua: "🐰 Pascua",
    anoNuevo: "🎆 Año Nuevo",
    invierno: "❄️ Invierno"
  };

  const nombreTemporada = nombres[temporada] || temporada;

  // Anuncio público
  if (canal) {
    await canal.send(
      `🩸✨ **¡Nueva temporada en Bloodline!**\n\n` +
      `${nombreTemporada} ha comenzado.\n\n` +
      `🎲 Los emojis ya fueron repartidos aleatoriamente.\n` +
      `📩 Revisa tus mensajes privados para descubrir cuál te tocó.\n\n` +
      `🔄 Recuerda: tienes **1 cambio de emoji** disponible durante esta temporada.`
    );
  }

  // Mensaje privado a cada miembro
  for (const resultado of resultados) {
    try {
      await resultado.member.send(
        `🩸 **¡Nueva temporada en Bloodline!**\n\n` +
        `Hola, **${resultado.member.user.username}** 🩸\n\n` +
        `Tu emoji de esta temporada es: ${resultado.emoji}\n\n` +
        `🎲 Te fue asignado aleatoriamente.\n` +
        `🔄 Tienes **1 cambio de emoji disponible** durante esta temporada.\n\n` +
        `Cuando esté disponible el comando, podrás usar:\n` +
        `**/cambiar-emoji**\n\n` +
        `¡Disfruta la nueva temporada! 🩸`
      );
    } catch (error) {
      console.log(
        `⚠️ No se pudo enviar DM a ${resultado.member.user.username}`
      );
    }
  }
}

module.exports = {
  anunciarNuevaTemporada
};
