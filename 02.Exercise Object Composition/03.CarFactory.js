function solve(clientOrder) {
  let engines = [
    { power: 90, volume: 1800 },
    { power: 120, volume: 2400 },
    { power: 200, volume: 3500 },
  ];

  let car = {
    model: clientOrder.model,
    engine: engines.find((e) => clientOrder.power <= e.power),
    carriage: {
      type: clientOrder.carriage,
      color: clientOrder.color,
    },
    wheels: Array(4).fill(
      clientOrder.wheelsize % 2 === 0
        ? clientOrder.wheelsize - 1
        : clientOrder.wheelsize
    ),
  };

  return car;
}

console.log(
  solve({
    model: "VW Golf II",
    power: 90,
    color: "blue",
    carriage: "hatchback",
    wheelsize: 14,
  })
);
