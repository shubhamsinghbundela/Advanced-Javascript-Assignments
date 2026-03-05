// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let primaryRunFast = false;
  let secondaryRunFast = false;
  let primaryFail = false;
  let secondaryFail = false;

  //Start the Primary immediately
  primary((err, data) => {
    if (data) {
       // if secondary run fast then ignore the primary result
      if (!secondaryRunFast) {
        // if primary is fast then do not trigger secondary 
        primaryRunFast = true;
        onComplete(err, data);
      }
    } else {
      primaryFail = true;
    }
    // Only fail if both fail
    if (primaryFail & secondaryFail) {
      let err = {
        message: "Secondary Failed",
      };
      onComplete(err);
    }
  });
  setTimeout(() => {
    // Secondary should not be triggered if Primary is fast
    if (!primaryRunFast) {
        // If primary is slow, start the Secondary.
      secondary((err, data) => {
        if (data) {
          secondaryRunFast = true;
          onComplete(err, data);
        } else {
          secondaryFail = true;
        }
        // Only fail if both fail
        if (primaryFail & secondaryFail) {
          let err = {
            message: "Secondary Failed",
          };
          onComplete(err);
        }
      });
    }
  }, timeoutMs);
}

module.exports = hedgedRequest;
