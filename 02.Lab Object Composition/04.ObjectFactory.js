function solve(inputAsJson) {
  let input = JSON.parse(inputAsJson);

  let myObject = {};

  for (const current of input) {
    for (const key in current) {
      if (!myObject.hasOwnProperty(key)) {
        myObject[key] = current[key];
      }
    }
  }

  return myObject;
}

console.log(
  solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`)
);
