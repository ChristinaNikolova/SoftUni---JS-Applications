function solve(input) {
  let cars = [];

  let carManager = {
    create: function ([name, , parentName]) {
      let newCar = {};

      if (parentName) {
        let parent = cars.find((c) => c.name === parentName);
        newCar = Object.create(parent);
      }

      newCar["name"] = name;
      cars.push(newCar);
    },
    set: function ([name, key, value]) {
      let targetCar = cars.find((c) => c.name === name);
      targetCar[key] = value;
    },
    print: function ([name]) {
      let targetCar = cars.find((c) => c.name === name);

      let result = "";
      let hasToAddComma = false;

      for (const key in targetCar) {
        if (key === "name") {
          continue;
        }

        if (!hasToAddComma) {
          hasToAddComma = true;
          result += `${key}:${targetCar[key]}`;
          continue;
        }

        result += ", " + `${key}:${targetCar[key]}`;
      }

      console.log(result);
    },
  };

  for (const current of input) {
    let tokens = current.split(" ");
    let command = tokens.shift();
    carManager[command](tokens);
  }
}

solve([
  "create c1",
  "create c2 inherit c1",
  "set c1 color red",
  "set c2 model new",
  "print c1",
  "print c2",
]);
