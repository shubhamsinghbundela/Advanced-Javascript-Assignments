// Problem Description – Sliding Window (Moving Average) Aggregator
//
// You are receiving a stream of numeric values asynchronously
// (e.g., sensor readings).
//
// Your task is to maintain a sliding window of the last N values
// and compute the moving average whenever a new value arrives.
//
// This problem tests state management and async data handling.
//
// Requirements:
// - Maintain only the last N values (fixed-size window).
// - Accept values asynchronously via a callback-style input.
// - On each new value, compute and emit the current average.
// - Before N values are received, compute the average
//   using only the available values.
function createWindowAggregator(windowSize, onWindowReady) {
  let arr = [];
  let l=0, r=windowSize-1;
  return function(...args){
     //On each new value, compute and emit the current average.
     arr.push(...args);
     //Before N values are received, compute the average
     if(arr.length<windowSize){
        let sum = 0;
        for(let i=0; i<arr.length;i++){
            sum+=arr[i];
        }

        let avg = sum/arr.length;
        onWindowReady(avg);
     }else{
       while(r<arr.length){
        // console.log(r);
          let sum = 0;
          for(let i=l; i<=r; i++){
            sum+=arr[i];
          }
          console.log(sum);

          let avg =  sum/windowSize;
          onWindowReady(avg);
          l+=1;
          r+=1;
       }
     }
  }
}

module.exports = createWindowAggregator;

