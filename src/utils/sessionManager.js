const { SESSION_STATES, PHASES, DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME } = require('../config/constants');

class SessionManager {
  constructor() {
    // Almacenamiento en memoria de sesiones por userId
    this.sessions = new Map();
  }

  /**
   * Crea una nueva sesión para un usuario
   * @param {number} userId - ID del usuario de Telegram
   * @param {number} workTime - Tiempo de trabajo en segundos
   * @param {number} breakTime - Tiempo de descanso en segundos
   * @returns {object} Sesión creada
   */
  createSession(userId, workTime = DEFAULT_WORK_TIME, breakTime = DEFAULT_BREAK_TIME) {
    const session = {
      userId,
      state: SESSION_STATES.WORK,
      phase: PHASES.WORK,
      workTime,
      breakTime,
      currentPhaseTime: workTime,
      startTime: Date.now(),
      pausedAt: null,
      cyclesCompleted: 0,
      custom: workTime !== DEFAULT_WORK_TIME || breakTime !== DEFAULT_BREAK_TIME
    };

    this.sessions.set(userId, session);
    return session;
  }

  /**
   * Obtiene la sesión de un usuario
   * @param {number} userId
   * @returns {object|null}
   */
  getSession(userId) {
    return this.sessions.get(userId) || null;
  }

  /**
   * Verifica si un usuario tiene sesión activa
   * @param {number} userId
   * @returns {boolean}
   */
  hasActiveSession(userId) {
    const session = this.getSession(userId);
    return session && session.state !== SESSION_STATES.INACTIVE;
  }

  /**
   * Pausa una sesión
   * @param {number} userId
   * @returns {object|null} Sesión pausada o null
   */
  pauseSession(userId) {
    const session = this.getSession(userId);
    if (!session || session.state === SESSION_STATES.PAUSED) {
      return null;
    }

    session.state = SESSION_STATES.PAUSED;
    session.pausedAt = Date.now();
    return session;
  }

  /**
   * Reanuda una sesión pausada
   * @param {number} userId
   * @param {number} remainingTime - Tiempo restante en segundos
   * @returns {object|null}
   */
  resumeSession(userId, remainingTime) {
    const session = this.getSession(userId);
    if (!session || session.state !== SESSION_STATES.PAUSED) {
      return null;
    }

    // Ajustamos el startTime para que el tiempo restante sea correcto
    session.startTime = Date.now() - (session.currentPhaseTime - remainingTime) * 1000;
    session.pausedAt = null;
    
    // Restauramos el estado anterior a la pausa
    if (session.phase === PHASES.WORK) {
      session.state = SESSION_STATES.WORK;
    } else {
      session.state = SESSION_STATES.BREAK;
    }

    return session;
  }

  /**
   * Transiciona de trabajo a descanso
   * @param {number} userId
   * @returns {object|null}
   */
  transitionToBreak(userId) {
    const session = this.getSession(userId);
    if (!session) return null;

    session.state = SESSION_STATES.BREAK;
    session.phase = PHASES.BREAK;
    session.currentPhaseTime = session.breakTime;
    session.startTime = Date.now();
    session.pausedAt = null;

    return session;
  }

  /**
   * Completa un ciclo y prepara para el siguiente
   * @param {number} userId
   * @returns {object|null}
   */
  completeCycle(userId) {
    const session = this.getSession(userId);
    if (!session) return null;

    session.cyclesCompleted += 1;
    session.state = SESSION_STATES.INACTIVE;
    
    return session;
  }

  /**
   * Elimina una sesión
   * @param {number} userId
   * @returns {boolean}
   */
  deleteSession(userId) {
    return this.sessions.delete(userId);
  }

  /**
   * Obtiene todas las sesiones activas (útil para recordatorios)
   * @returns {Array}
   */
  getAllActiveSessions() {
    return Array.from(this.sessions.values()).filter(
      s => s.state !== SESSION_STATES.INACTIVE
    );
  }

  /**
   * Limpia sesiones inactivas (mantenimiento)
   */
  cleanupInactiveSessions() {
    for (const [userId, session] of this.sessions.entries()) {
      if (session.state === SESSION_STATES.INACTIVE) {
        this.sessions.delete(userId);
      }
    }
  }
}

module.exports = new SessionManager();