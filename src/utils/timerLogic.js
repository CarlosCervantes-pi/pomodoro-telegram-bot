class TimerLogic {
  calculateRemaining(startTime, totalTime, pausedAt = null) {
    const now = Date.now();
    const referenceTime = pausedAt || now;
    const elapsed = Math.floor((referenceTime - startTime) / 1000);
    const remaining = totalTime - elapsed;
    return Math.max(0, remaining);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes: mins, seconds: secs };
  }

  minutesToSeconds(minutes) {
    return minutes * 60;
  }
}

module.exports = new TimerLogic();