function solve(input) {
  let rectangles = [];

  for (const current of input) {
    let [width, height] = current;

    let currentRectangle = {
      width,
      height,
      area: function () {
        return this.width * this.height;
      },
      compareTo: function (other) {
        return other.area() - this.area() || other.width - this.width;
      },
    };

    rectangles.push(currentRectangle);
  }

  return rectangles.sort((a, b) => a.compareTo(b));
}

console.log(
  solve([
    [10, 5],
    [5, 12],
  ])
);
