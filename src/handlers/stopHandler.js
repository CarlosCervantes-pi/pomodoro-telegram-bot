const sessionManager = require('../utils/sessionManager');
const timerLogic = require('../utils/timerLogic');
const MESSAGES = require('../utils/messages');

// Almacenar usuarios esperando confirmación
const pendingStops = new Set();

/**
 * Handler para detener una sesión
 */
async function handleStop(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const session = sessionManager.getSession(userId);

    // Verificar que hay sesión activa
    if (!session || session.state === 'inactive') {
      await bot.sendMessage(chatId, MESSAGES.noActiveSession());
      return;
    }

    // Calcular tiempo restante
    const remaining = timerLogic.calculateRemaining(
      session.startTime,
      session.currentPhaseTime,
      session.pausedAt
    );

    const { minutes } = timerLogic.formatTime(remaining);

    // Pedir confirmación
    pendingStops.add(userId);
    await bot.sendMessage(chatId, MESSAGES.confirmStop(minutes, session.phase));

  } catch (error) {
    console.error('Error en handleStop:', error);
    await bot.sendMessage(chatId, 'Hubo un error al detener. Intenta de nuevo.');
  }
}

/**
 * Handler para confirmar detención
 */
async function handleStopConfirm(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text.toLowerCase();

  try {
    // Verificar si el usuario está esperando confirmación
    if (!pendingStops.has(userId)) {
      return; // No hacer nada si no está esperando
    }

    // Si confirma con "sí"
    if (text === 'sí' || text === 'si' || text === 'yes') {
      sessionManager.deleteSession(userId);
      pendingStops.delete(userId);
      await bot.sendMessage(chatId, MESSAGES.stopped());
    } 
    // Si cancela
    else if (text === 'no' || text === 'cancelar') {
      pendingStops.delete(userId);
      await bot.sendMessage(chatId, 'De acuerdo, tu sesión continúa.');
    }

  } catch (error) {
    console.error('Error en handleStopConfirm:', error);
  }
}

module.exports = { handleStop, handleStopConfirm, pendingStops };