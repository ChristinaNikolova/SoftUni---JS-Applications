async function solve() {
  let $elements = {
    allMonkeys: document.getElementById("allMonkeys"),
  };

  Handlebars.registerPartial(
    "monkey",
    await fetch("./template-singleMonkey.hbs").then((r) => r.text())
  );

  let template = Handlebars.compile(
    await fetch("./template-monkeys.hbs").then((r) => r.text())
  );

  let result = template({ monkeys });
  $elements.allMonkeys.innerHTML += result;

  let $buttons = document.getElementsByClassName("infoBtn");

  Array.from($buttons).forEach((button) => {
    button.addEventListener("click", showMonkeyInfo);
  });

  function showMonkeyInfo(event) {
    let parent = event.target.parentElement;

    if (parent.children[3].style.display === "none") {
      parent.children[3].style.display = "block";
    } else {
      parent.children[3].style.display = "none";
    }
  }
}

solve();
