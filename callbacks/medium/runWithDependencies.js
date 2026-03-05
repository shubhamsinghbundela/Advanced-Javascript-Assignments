// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runWithDependencies(tasks, finalCallback) {
  let queue = [];
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].deps.length>0){
        tasks[i].deps.forEach(element => {
             let findTask = tasks.find(e => e.id == element);
             queue.push(findTask)
        });
        queue.push(tasks[i])
    }else{
      queue.push(tasks[i])
    }
  }
  let err = false;
  // let active = 0;
  let obj = {};

  for (let i = 0; i < queue.length; i++) {
    const element = queue[i];
    queue[i].run((err, data)=>{
      if(err){
        err=true;
      }else{
        // arr.push({[element.id]: data})
        obj[element.id] = data
      }
      if(i==queue.length-1){
        finalCallback(err, obj)
      }
    })
  }
}

module.exports = runWithDependencies;
