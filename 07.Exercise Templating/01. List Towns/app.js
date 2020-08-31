function solve() {
  let baseUrl = "http://restcountries.eu/rest/v2/all";

  let $elements = {
    loadButton: document.getElementById("btnLoadCountries"),
    root: document.getElementById("root"),
  };

  $elements.loadButton.addEventListener("click", getCountries);

  function getCountries() {
    Promise.all([
      fetch(baseUrl).then((r) => r.json()),
      fetch("./template-countries.hbs").then((r) => r.text()),
    ])
      .then((d) => showCountries(d))
      .catch((e) => console.error(e));

    function showCountries([countries, templateData]) {
      let template = Handlebars.compile(templateData);

      let result = template({ countries });
      $elements.root.innerHTML = result;
    }
  }
}

solve();
