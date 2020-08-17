function getFibonator() {
  let prevFib = 0;
  let currentFib = 1;

  return function () {
    let result = currentFib;
    [prevFib, currentFib] = [currentFib, currentFib + prevFib];

    return result;
  };
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
