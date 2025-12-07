const sessionManager = require('../utils/sessionManager');
const timerLogic = require('../utils/timerLogic');
const MESSAGES = require('../utils/messages');
const { schedulePhaseCompletion } = require('./pomodoroHandler');

async function handleResume(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const session = sessionManager.getSession(userId);

    if (!session || session.state !== 'paused') {
      await bot.sendMessage(chatId, MESSAGES.noPausedSession());
      return;
    }

    const remaining = timerLogic.calculateRemaining(
      session.startTime,
      session.currentPhaseTime,
      session.pausedAt
    );

    sessionManager.resumeSession(userId, remaining);
    const { minutes, seconds } = timerLogic.formatTime(remaining);
    await bot.sendMessage(chatId, MESSAGES.resumed(minutes, seconds, session.phase));

    schedulePhaseCompletion(bot, chatId, userId, remaining);
  } catch (error) {
    console.error('Error en handleResume:', error);
    await bot.sendMessage(chatId, 'Hubo un error al reanudar. Intenta de nuevo.');
  }
}

module.exports = handleResume;