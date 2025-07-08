// pulseEmitter.js
// A simple event emitter that emits 'pulse' events at a configurable interval.

class PulseEmitter {
  /**
   * @param {number} intervalMs - Interval between pulses in milliseconds.
   */
  constructor(intervalMs = 1000) {
    this.intervalMs = intervalMs;
    this.listeners = new Set();
    this._intervalId = null;
  }

  /**
   * Start emitting pulse events.
   */
  start() {
    if (this._intervalId) return; // already running
    this._intervalId = setInterval(() => {
      this.listeners.forEach((listener) => {
        try {
          listener(Date.now());
        } catch (e) {
          console.error('PulseEmitter listener error:', e);
        }
      });
    }, this.intervalMs);
  }

  /**
   * Stop emitting pulse events.
   */
  stop() {
    if (!this._intervalId) return;
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  /**
   * Add a listener callback to the pulse event.
   * @param {function(number):void} listener - Receives timestamp of pulse.
   */
  onPulse(listener) {
    if (typeof listener === 'function') {
      this.listeners.add(listener);
    } else {
      throw new Error('Listener must be a function');
    }
  }

  /**
   * Remove a listener callback.
   * @param {function} listener
   */
  offPulse(listener) {
    this.listeners.delete(listener);
  }
}

// Usage example:
// const emitter = new PulseEmitter(500);
// emitter.onPulse((timestamp) => console.log('Pulse at', timestamp));
// emitter.start();

export default PulseEmitter;
