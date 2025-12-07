const sessionManager = require('../utils/sessionManager');
const timerLogic = require('../utils/timerLogic');
const MESSAGES = require('../utils/messages');

async function handlePause(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const session = sessionManager.getSession(userId);

    if (!session || session.state === 'inactive') {
      await bot.sendMessage(chatId, MESSAGES.noActiveSession());
      return;
    }

    if (session.state === 'paused') {
      await bot.sendMessage(chatId, 'Tu sesión ya está pausada. Usa /continuar para reanudar.');
      return;
    }

    const remaining = timerLogic.calculateRemaining(session.startTime, session.currentPhaseTime);
    sessionManager.pauseSession(userId);
    const { minutes, seconds } = timerLogic.formatTime(remaining);
    await bot.sendMessage(chatId, MESSAGES.paused(minutes, seconds, session.phase));
  } catch (error) {
    console.error('Error en handlePause:', error);
    await bot.sendMessage(chatId, 'Hubo un error al pausar. Intenta de nuevo.');
  }
}

module.exports = handlePause;