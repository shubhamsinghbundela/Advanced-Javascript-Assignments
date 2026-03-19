// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class Scheduler {
  constructor() {
    this.queue = [];
    this.timer = null;
    this.running = false;
  }

  schedule(task, priority = 0) {
    this.queue.push({ task, priority });

    // always maintain priority order
    this.queue.sort((a, b) => b.priority - a.priority);

    // start scheduler only if not already running
    if (!this.running) {
      this.running = true;
      this.timer = setTimeout(() => this.run(), 0);
    }
  }

  run(onAllFinished) {
    if (this.queue.length === 0) {
      this.running = false;
      this.timer = null;
      return onAllFinished && onAllFinished(null);
    }

    const { task } = this.queue.shift();

    task((err) => {
      if (err) {
        this.running = false;
        this.timer = null;
        return onAllFinished && onAllFinished(err);
      }

      // schedule next task (instead of loop or interval)
      this.timer = setTimeout(() => this.run(onAllFinished), 0);
    });
  }
}

module.exports = Scheduler;
