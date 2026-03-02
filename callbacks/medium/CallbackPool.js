// Problem Description – Asynchronous Worker Pool
//
// You are required to create a worker pool that manages the execution
// of asynchronous tasks.
// The pool should ensure that no more than N tasks are running concurrently,
// while any additional tasks are queued.
// As tasks complete, queued tasks should start automatically.
// Each task must invoke its callback with its result when finished.

// 1. I have to create a wroker pool that manages the exceution of asynchronous task
// so yaha prh mereko lgh rha hai worker pool is callback-based asynchronous function
// here task 
// const task = (cb) => {
//       activeCount++;
//       maxActive = Math.max(maxActive, activeCount);
//       setTimeout(() => {
//         activeCount--;
//         cb(null, "done");
//       }, 20);
//     };

// 2. The pool should ensure that no more than N tasks are running concurrently 
// It means at a time only N number of tasks will execute 

// 3. additional tasks are queued.
// It means once task get completed queued task should start automatically

// 4. Each task must invoke its callback with its result when finished. -> Understand invoke callback when async task executed
class CallbackPool {
  constructor(limit) {
    this.limit = limit;        
    // maintain a queue
    this.queue = [];          
    // track running count in class state
    this.active = 0;          
  }

  run(task, onComplete) {
    // push task via enqueue
    this.queue.push({ task, onComplete });
    this._next(); // Try to execute
  }

  _next() {

    // Start when slot is free
    while (this.active < this.limit && this.queue.length > 0) {
      const { task, onComplete } = this.queue.shift();

      this.active++;

      task((err, data) => {
        // decrease running after finishes
        this.active--;

        if (onComplete) {
          onComplete(err, data);
        }
        // trigger next
        this._next();
      });
    }
  }
}

module.exports = CallbackPool;
