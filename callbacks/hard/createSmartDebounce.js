// Problem Description – Debounced Search with Result Guard
//
// You are building a search bar that should not call the API
// on every keystroke, so the request must be debounced.
//
// If an older request finishes after a newer one, its result
// must be ignored to prevent stale UI updates.
//
// Requirements:
// - Delay execution by waitMs.
// - Reset the timer on repeated calls.
// - Only the latest request may trigger the callback.

// When building a search bar, we should not call the API on every keystroke because that would create too many unnecessary network requests.

// To solve this, we use debouncing.
// Debouncing ensures that the API call is triggered only after the user stops typing for a specified amount of time.

// For example:
// If the debounce delay is 1 second
// The user types "jav"
// Before 1 second completes, they type "java"
// The timer resets again for 1 second.
// So the API request is made only after the user stops typing for 1 full second — meaning only "java" is sent, not "j", "ja", or "jav".

function createSmartDebounce(worker, waitMs) {
  return function(...args) {
     const callbackFn = args.pop();
     // here for ex: waitMS = 20ms
     setTimeout(()=>{
        worker(...args, (err, data)=>{
            callbackFn(err, data)
        })
    }, waitMs);
  }
    
}

module.exports = createSmartDebounce;


// function createSmartDebounce(worker, waitMs) {
//   return function(...args) {
//      const callbackFn = args.pop();
//      // here for ex: waitMS = 20sec so in 20sec if any new debounce come then I will retry
//      setTimeout(()=>{
//         worker(...args, (err, data)=>{
//             callbackFn(err, data)
//         })
//     }, waitMs);
//   }
    
// }

// const worker = (input, cb) => {
//       const delay = input === "first" ? 100 : 20;
//       setTimeout(() => cb(null, input), delay);
//     };

//     const debounced = createSmartDebounce(worker, 50);
//     const results = [];

//     debounced("first", (err, data) => {
//       console.log('20', data)
//       results.push(data);
//     });

//     setTimeout(() => {
//       debounced("second", (err, data) => {
//         console.log(data)
//         results.push(data);
//         console.log(results)
//       });
//     }, 60); 
