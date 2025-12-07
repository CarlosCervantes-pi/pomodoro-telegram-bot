const { EMOJIS } = require('../config/constants');

const MESSAGES = {
  welcome: (name) => 
    `${EMOJIS.TOMATO} ¡Hola ${name}! Soy Focus Timer.\n\n` +
    `Te ayudo a aplicar la técnica Pomodoro para mejorar tu concentración.\n\n` +
    `${EMOJIS.FIRE} Comandos disponibles:\n` +
    `/pomodoro - Iniciar sesión estándar (25 min trabajo / 5 min descanso)\n` +
    `/pausar - Pausar sesión actual\n` +
    `/continuar - Reanudar sesión pausada\n` +
    `/tiempo - Consultar tiempo restante\n` +
    `/detener - Cancelar sesión actual\n` +
    `/ayuda - Ver estos comandos de nuevo`,

  sessionStart: (workMinutes) =>
    `${EMOJIS.WORK} Perfecto, iniciando ${workMinutes} minutos de concentración.\n\n` +
    `${EMOJIS.FIRE} ¡A trabajar! Te avisaré cuando termine.`,

  workComplete: (breakMinutes) =>
    `${EMOJIS.CHECK} ¡Excelente trabajo!\n\n` +
    `${EMOJIS.BREAK} Ahora tómate ${breakMinutes} minutos de descanso. Te avisaré cuando termine.`,

  breakComplete: () =>
    `${EMOJIS.CLOCK} Tu descanso terminó.\n\n` +
    `¿Quieres comenzar otro ciclo?\n` +
    `Usa /pomodoro para continuar o /detener para terminar.`,

  paused: (minutes, seconds, phase) =>
    `${EMOJIS.PAUSE} Temporizador pausado.\n\n` +
    `Te quedan ${minutes} minutos y ${seconds} segundos de ${phase}.\n\n` +
    `Usa /continuar cuando estés listo.`,

  resumed: (minutes, seconds, phase) =>
    `${EMOJIS.PLAY} Continuando tu ${phase} de ${minutes} minutos y ${seconds} segundos.\n\n` +
    `¡Sigamos!`,

  status: (minutes, seconds, phase, state) => {
    if (state === 'paused') {
      return `${EMOJIS.PAUSE} Tu sesión está pausada.\n\n` +
             `${EMOJIS.CLOCK} Te quedan ${minutes} minutos y ${seconds} segundos de ${phase}.`;
    }
    return `${EMOJIS.CLOCK} Te quedan ${minutes} minutos y ${seconds} segundos de ${phase}.`;
  },

  confirmStop: (minutes, phase) =>
    `${EMOJIS.WARNING} ¿Estás seguro que quieres detener tu sesión?\n\n` +
    `Te quedan ${minutes} minutos de ${phase} y se perderá el progreso.\n\n` +
    `Responde "sí" para confirmar o /continuar para seguir trabajando.`,

  stopped: () =>
    `${EMOJIS.STOP} Sesión detenida.\n\n` +
    `Espero que hayas sido productivo. ¡Hasta la próxima!`,

  noActiveSession: () =>
    `${EMOJIS.WARNING} No hay ninguna sesión activa.\n\n` +
    `Usa /pomodoro para iniciar una.`,

  noPausedSession: () =>
    `${EMOJIS.WARNING} No hay ninguna sesión pausada.\n\n` +
    `Usa /pomodoro para comenzar una nueva.`,

  alreadyActive: () =>
    `${EMOJIS.WARNING} Ya tienes una sesión activa.\n\n` +
    `Usa /detener primero si quieres comenzar una nueva.`,

  help: () =>
    `${EMOJIS.TOMATO} *Focus Timer - Ayuda*\n\n` +
    `*Técnica Pomodoro:*\n` +
    `Trabaja en bloques de tiempo (25 min por defecto) seguidos de descansos cortos (5 min).\n\n` +
    `*Comandos:*\n` +
    `/pomodoro - Iniciar sesión estándar\n` +
    `/pausar - Pausar temporalmente\n` +
    `/continuar - Reanudar sesión\n` +
    `/tiempo - Ver tiempo restante\n` +
    `/detener - Cancelar sesión\n` +
    `/ayuda - Ver esta ayuda`
};

module.exports = MESSAGES;