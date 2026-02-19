// Problem Description – callbackify(fn)
//
// You are required to write a function named callbackify that takes a function
// which returns a Promise.
// The function should return a new function that accepts a callback as its
// last argument.
// When the Promise resolves, the callback should be called with `(null, data)`.
// When the Promise rejects, the callback should be called with the error.


function callbackify(fn) {
    return function (...args) {
    // Last argument is callback
    const callback = args.pop();

    fn(...args)
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  };
}
module.exports = callbackify;

// function callbackify(fn) {
//     return function (...args) {
//     // Last argument is callback
//     const callback = args.pop();

//     fn(...args)
//       .then((data) => callback(null, data))
//       .catch((err) => callback(err));
//   };
// }
// const promiseFn1 = (a, b) => {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(a + b), 10);
//     });
// };
// const promiseFn2 = () => Promise.reject("error message");
// let output = callbackify(promiseFn1)
// output(1,2, (err, result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result)
//     }
// })

