import React from "react";
const cl = console.log;

class Tests extends React.Component {


  render() {
    function p1plus1(result) {
      cl(result);
      return result + 1;
    }

    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => p1.then(r => p1plus1(r)), 1000);
      setTimeout(() => resolve("a"), 2000);
    });

    cl(Promise.resolve(p1));

    /*
    cl("p1", p1.then(r => r));

    let r_1 = p1.then(r => p1plus1(r))
    // cl("r_1", r_1);
    let r_2 = r_1.then(r => p1plus1(r))
    // cl("r_2", r_2);
    let r_3 = r_2.then(r => p1plus1(r))
    // cl("r_3", r_3); 

    cl("r_1", r_1);
    cl("r_2", r_2);
    cl("r_3", r_3); */
    




    return (
      <div>
        <h1>Tests</h1>
        <p>{ }</p>
      </div>
    )
  }
}


export default Tests;