function solve() {
  let $elements = {
    allCats: document.getElementById("allCats"),
  };

  Promise.all([
    fetch("./template-singleCat.hbs").then((r) => r.text()),
    fetch("./template-cats.hbs").then((r) => r.text()),
  ])
    .then((d) => showInfo(d))
    .catch((e) => console.error(e));

  function showInfo([partialData, templateData]) {
    Handlebars.registerPartial("cat", partialData);

    let template = Handlebars.compile(templateData);

    let result = template({ cats });
    $elements.allCats.innerHTML += result;

    let $buttons = document.getElementsByClassName("showBtn");

    Array.from($buttons).forEach((button) => {
      button.addEventListener("click", showCatInfo);
    });

    function showCatInfo(event) {
      let parent = event.target.parentElement;

      if (parent.children[1].style.display === "none") {
        parent.children[1].style.display = "block";
        parent.children[0].textContent = "Hide status code";
      } else {
        parent.children[1].style.display = "none";
        parent.children[0].textContent = "Show status code";
      }
    }
  }
}

solve();
