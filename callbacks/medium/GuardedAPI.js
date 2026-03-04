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
    this.initTask = initTask;
  }

  call(apiFn, onComplete) {
    this.queue.push({apiFn, onComplete});
    this.initTask((err, data)=>{
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

