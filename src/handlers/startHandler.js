const MESSAGES = require('../utils/messages');

/**
 * Handler para el comando /start
 * Muestra mensaje de bienvenida y comandos disponibles
 */
async function handleStart(bot, msg) {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Usuario';

  try {
    await bot.sendMessage(chatId, MESSAGES.welcome(userName), {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error en handleStart:', error);
    await bot.sendMessage(chatId, 'Hubo un error. Intenta de nuevo.');
  }
}

module.exports = handleStart;