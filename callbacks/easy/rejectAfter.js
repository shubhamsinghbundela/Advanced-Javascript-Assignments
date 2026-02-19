// Problem Description – rejectAfter(ms, callback)
//
// You are required to create a function named rejectAfter that accepts a time
// duration in milliseconds and a callback function.
// The function should wait for the specified time and then invoke the callback
// with an error.

function rejectAfter(ms, callback) {
    let promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let err={};
            err.message=`Rejected after ${ms}ms`
            reject(err);
        },ms)
    })
    return promise.then(()=>callback(null,data)).catch((err)=>callback(err,null))
}

 rejectAfter(100, (err, result) => {
    console.log(err)
 })

module.exports = rejectAfter;

