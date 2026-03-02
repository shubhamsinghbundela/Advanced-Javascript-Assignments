// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

//  const items = [100, 50, 10];
//     const worker = (delay, cb) => setTimeout(() => cb(null, `Finished ${delay}`), delay);

//     batchProcess(items, 2, worker, (err, results) => {
//       try {
//         expect(err).toBeNull();
//         expect(results).toEqual(["Finished 100", "Finished 50", "Finished 10"]);
//         done();
//       } catch (e) { done(e); }
//     });
//   });

//You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion. 

// What I understand from above For ex: item is pizza which parallely process i.e. deliver limit at a time only 2 get deliver or till limit it can deliver
//  Preserve the original order of results. So I have to output items like ["Finished Pizza 1", "Finished Pizza 2", "Finished Pizza 3"]



function batchProcess(items, limit, worker, onComplete) {
  let results = [];
  let index = 0;
  let completed = 0;
  let active = 0;

  function next() {
    // All done
    if (completed === items.length) {
      return onComplete(null, results);
    }

    // Start new tasks while under limit
    while (active < limit && index < items.length) {
      const currentIndex = index;
      active++;
      index++;

      worker(items[currentIndex], (err, data) => {
        if (err) return onComplete(err);

        results[currentIndex] = data;
        active--;
        completed++;

        next() // Start next task when one finishes
      });
    }
  }

  next();
}


module.exports = batchProcess;
