const cl = console.log;

function p1plus1(result) {
  cl(result);
  return setTimeout(() => new Promise(resolve => resolve(result + 1)), 1000);
}
let p1 = new Promise((resolve, reject) => {
  resolve("a");
});

    let r_1 = p1.then(r => p1plus1(r))
    cl("r_1", r_1);
    let r_2 = r_1.then(r => p1plus1(r))
    cl("r_2", r_2);
    let r_3 = r_2.then(r => p1plus1(r))
    cl("r_3", r_3); 

    // cl("r_1", r_1);
    // cl("r_2", r_2);
    // cl("r_3", r_3);

// cl(Promise.resolve(p1));