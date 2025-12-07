require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Handlers
const handleStart = require('./handlers/startHandler');
const { handlePomodoro } = require('./handlers/pomodoroHandler');
const handlePause = require('./handlers/pauseHandler');
const handleResume = require('./handlers/resumeHandler');
const handleStatus = require('./handlers/statusHandler');
const { handleStop, handleStopConfirm } = require('./handlers/stopHandler');

// Utilidades
const MESSAGES = require('./utils/messages');
const { COMMANDS } = require('./config/constants');

// Validar token
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('❌ ERROR: TELEGRAM_BOT_TOKEN no está definido en el archivo .env');
  process.exit(1);
}

// Crear bot
const bot = new TelegramBot(token, { polling: true });

console.log('🍅 Focus Timer Bot iniciado correctamente');
console.log('📡 Esperando comandos...\n');

// ============================================
// REGISTRO DE COMANDOS
// ============================================

// Comando /start
bot.onText(/\/start/, (msg) => handleStart(bot, msg));

// Comando /pomodoro
bot.onText(/\/pomodoro/, (msg) => handlePomodoro(bot, msg));

// Comando /pausar
bot.onText(/\/pausar/, (msg) => handlePause(bot, msg));

// Comando /continuar
bot.onText(/\/continuar/, (msg) => handleResume(bot, msg));

// Comando /tiempo
bot.onText(/\/tiempo/, (msg) => handleStatus(bot, msg));

// Comando /detener
bot.onText(/\/detener/, (msg) => handleStop(bot, msg));

// Comando /ayuda
bot.onText(/\/ayuda/, async (msg) => {
  await bot.sendMessage(msg.chat.id, MESSAGES.help(), { parse_mode: 'Markdown' });
});

// ============================================
// MANEJO DE MENSAJES DE TEXTO (para confirmaciones)
// ============================================
bot.on('message', async (msg) => {
  // Ignorar comandos (ya los manejamos arriba)
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }

  // Manejar confirmaciones de detención
  if (msg.text) {
    await handleStopConfirm(bot, msg);
  }
});

// ============================================
// MANEJO DE ERRORES
// ============================================
bot.on('polling_error', (error) => {
  console.error('❌ Error de polling:', error.code, error.message);
});

bot.on('error', (error) => {
  console.error('❌ Error general del bot:', error);
});

// ============================================
// LIMPIEZA AL CERRAR
// ============================================
process.on('SIGINT', () => {
  console.log('\n\n🛑 Cerrando bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Cerrando bot...');
  bot.stopPolling();
  process.exit(0);
});

module.exports = bot;