// Problem Description – Async Initialization Gate
//
// You are required to design a mechanism for APIs that depend on an
// asynchronous initialization step.
// Any calls made before initialization completes should be queued and
// executed only after the initialization finishes.
// Calls made after initialization should execute immediately.
//
// The initialization task and API functions must invoke callbacks when
// they complete.
class GuardedAPI {
  constructor() {
    this.queue = [];
  }

  init(initTask) {
    //asynchronous initialization
    this.initTask = initTask;
  }

  call(apiFn, onComplete) {
     // Any calls made before initialization completes should be queued an executed only after the initialization finishes.
    this.queue.push({apiFn, onComplete});
    this.initTask((err, data)=>{
      // APIs that depend on an asynchronous initialization step.
      // The initialization task 
      this._flush();
    })
  }

  _flush() {
     const {apiFn, onComplete} = this.queue.shift();
     apiFn((err, data)=>{
      onComplete(err, data)
     })
  }
}

module.exports = GuardedAPI;

