// Constantes del sistema Focus Timer

const DEFAULT_WORK_TIME = 25 * 60; // 25 minutos en segundos
const DEFAULT_BREAK_TIME = 5 * 60; // 5 minutos en segundos

const MIN_WORK_TIME = 5 * 60;
const MAX_WORK_TIME = 90 * 60;
const MIN_BREAK_TIME = 1 * 60;
const MAX_BREAK_TIME = 30 * 60;

const SESSION_STATES = {
  INACTIVE: 'inactive',
  WORK: 'work',
  BREAK: 'break',
  PAUSED: 'paused'
};

const PHASES = {
  WORK: 'trabajo',
  BREAK: 'descanso'
};

const COMMANDS = {
  START: '/start',
  POMODORO: '/pomodoro',
  PAUSE: '/pausar',
  RESUME: '/continuar',
  STATUS: '/tiempo',
  STOP: '/detener',
  HELP: '/ayuda'
};

const EMOJIS = {
  TOMATO: '🍅',
  WORK: '💼',
  BREAK: '☕',
  PAUSE: '⏸️',
  PLAY: '▶️',
  STOP: '⏹️',
  CLOCK: '⏰',
  CHECK: '✅',
  WARNING: '⚠️',
  FIRE: '🔥'
};

module.exports = {
  DEFAULT_WORK_TIME,
  DEFAULT_BREAK_TIME,
  MIN_WORK_TIME,
  MAX_WORK_TIME,
  MIN_BREAK_TIME,
  MAX_BREAK_TIME,
  SESSION_STATES,
  PHASES,
  COMMANDS,
  EMOJIS
};