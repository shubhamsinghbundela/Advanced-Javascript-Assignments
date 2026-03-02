// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.active = 0;
  }

  setLimit(newLimit) {
    this.newLimit = newLimit
  }

  add(task, priority, onComplete) {
    // task -> (cb) => setTimeout(() => cb(null, "low"), 10)
    // priority -> 0, 0, 10
    // onComplete ->  (err, res) => { results.push(res); checkDone();}
    // Higher-priority tasks should be executed before lower-priority ones.
    this.queue.push({task, priority, onComplete});
    this.queue.sort((a, b)=>{
      return b.priority - a.priority; 
    })
    this.runNext();
  }

  runNext() {
    // The queue must enforce a concurrency limit, ensuring only a fixed number of tasks run at the same time.
    while(this.active<this.concurrency && this.queue.length){
      const {task, priority, onComplete} = this.queue.shift();
      this.active++
      task((err, data)=>{
        this.active--;
        if(onComplete){
          onComplete(null, data);
        }
        this.runNext();
      })
    }
  }
}

module.exports = DynamicPriorityQueue;
