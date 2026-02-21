// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

//  let calls = 0;

//     const fn = (cb) => {
//       calls++;
//       if (calls === 1) {
//         cb("fail", null);
//       } else {
//         cb(null, "success");
//       }
//     };

//     const wrapped = retryOnce(fn);

function retryOnce(fn) {
    return function (...args) {
        const callback = args.pop();
        fn(...args, (err,data)=>{
            if(err){
                fn(...args, (err,data)=>{
                    if(err){
                        callback(err, data);
                    }else{
                      callback(err, data);  
                    }
                })
            }else{
                callback(err, data);
            }
        })
    }
}

module.exports = retryOnce;
