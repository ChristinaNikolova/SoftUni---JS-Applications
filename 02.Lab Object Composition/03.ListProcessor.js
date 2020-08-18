function solve(input) {
  let words = [];

  let listProcessor = {
    add: function (word) {
      words.push(word);
    },
    remove: function (word) {
      words = words.filter((w) => w !== word);
    },
    print: function () {
      console.log(words.join(","));
    },
  };

  for (const current of input) {
    let [command, word] = current.split(" ");
    listProcessor[command](word);
  }
}

solve(["add hello", "add again", "remove hello", "add again", "print"]);
