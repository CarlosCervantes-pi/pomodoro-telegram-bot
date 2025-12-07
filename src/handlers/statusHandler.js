const sessionManager = require('../utils/sessionManager');
const timerLogic = require('../utils/timerLogic');
const MESSAGES = require('../utils/messages');

async function handleStatus(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const session = sessionManager.getSession(userId);

    if (!session || session.state === 'inactive') {
      await bot.sendMessage(chatId, MESSAGES.noActiveSession());
      return;
    }

    const remaining = timerLogic.calculateRemaining(
      session.startTime,
      session.currentPhaseTime,
      session.pausedAt
    );

    const { minutes, seconds } = timerLogic.formatTime(remaining);
    await bot.sendMessage(chatId, MESSAGES.status(minutes, seconds, session.phase, session.state));
  } catch (error) {
    console.error('Error en handleStatus:', error);
    await bot.sendMessage(chatId, 'Hubo un error al consultar el estado.');
  }
}

module.exports = handleStatus;