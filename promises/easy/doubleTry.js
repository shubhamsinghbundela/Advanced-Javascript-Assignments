// // Problem Description – Double Try (Basic Retry)
// //
// // You are given an async function fn that may fail.
// // Your task is to implement doubleTry(fn).
// //
// // Call fn once. If it succeeds, return the result.
// // If it fails, call fn one more time immediately.
// // If the second attempt fails, reject with the error.

// async function doubleTry(fn) {
//   return fn()
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((err) => {
//       return fn()
//         .then((data) => {
//           console.log(data);
//           return data;
//         })
//         .catch((err) => {
//           throw err;
//     }
//   );
//     });
// }

async function doubleTry(fn) {
  try {
    const result = await fn();
    return result;
  } catch (err) {
    try {
      const result = await fn();
      return result;
    } catch (err) {
        throw err;
    }
  }
}

module.exports = doubleTry;
