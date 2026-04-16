// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
  if (promises.length === 0) {
    return Promise.reject(new Error("Empty iterable"));
  }

  return new Promise((res, rej) => {
    let errors = [];
    let completed = 0;

    promises.forEach((element, index) => {
      Promise.resolve(element)
        .then((data) => {
          res(data); // first success wins
        })
        .catch((err) => {
          errors[index] = err;
          completed++;

          if (completed === promises.length) {
            rej(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

module.exports = promiseAny;
