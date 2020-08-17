function arrayMap(array, func) {
  return array.reduce((acc, curr) => {
    return acc.concat(func(curr));
  }, []);
}

let nums = [1, 2, 3, 4, 5];
console.log(arrayMap(nums, (item) => item * 2));
