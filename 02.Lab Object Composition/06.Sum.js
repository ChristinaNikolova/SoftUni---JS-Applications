function solve() {
  let first;
  let second;
  let result;

  let objectToModifyDOM = {
    init: function (selector1, selector2, resultSelector) {
      first = $(selector1);
      second = $(selector2);
      result = $(resultSelector);
    },
    add: function () {
      let numValFirst = +first.val();
      let numValSecond = +second.val();
      +result.val(numValFirst + numValSecond);
    },
    subtract: function () {
        let numValFirst = +first.val();
        let numValSecond = +second.val();
        +result.val(numValFirst - numValSecond);
    },
  };

  return objectToModifyDOM;
}
