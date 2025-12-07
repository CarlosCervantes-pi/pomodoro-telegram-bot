const sessionManager = require('../utils/sessionManager');
const timerLogic = require('../utils/timerLogic');
const MESSAGES = require('../utils/messages');
const { DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME } = require('../config/constants');

async function handlePomodoro(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    if (sessionManager.hasActiveSession(userId)) {
      await bot.sendMessage(chatId, MESSAGES.alreadyActive());
      return;
    }

    const session = sessionManager.createSession(userId, DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME);
    const workMinutes = DEFAULT_WORK_TIME / 60;
    await bot.sendMessage(chatId, MESSAGES.sessionStart(workMinutes));

    schedulePhaseCompletion(bot, chatId, userId, DEFAULT_WORK_TIME);
  } catch (error) {
    console.error('Error en handlePomodoro:', error);
    await bot.sendMessage(chatId, 'Hubo un error al iniciar el Pomodoro. Intenta de nuevo.');
  }
}

function schedulePhaseCompletion(bot, chatId, userId, duration) {
  setTimeout(async () => {
    const session = sessionManager.getSession(userId);
    
    if (!session || session.state === 'inactive' || session.state === 'paused') {
      return;
    }

    if (session.phase === 'trabajo') {
      sessionManager.transitionToBreak(userId);
      const breakMinutes = session.breakTime / 60;
      await bot.sendMessage(chatId, MESSAGES.workComplete(breakMinutes));
      schedulePhaseCompletion(bot, chatId, userId, session.breakTime);
    } else {
      sessionManager.completeCycle(userId);
      await bot.sendMessage(chatId, MESSAGES.breakComplete());
    }
  }, duration * 1000);
}

module.exports = { handlePomodoro, schedulePhaseCompletion };