function attachEvents() {
  let baseUrl = "https://judgetests.firebaseio.com/";

  let $elements = {
    submitButton: document.getElementById("submit"),
    location: document.getElementById("location"),
    forecast: document.getElementById("forecast"),
    current: document.getElementById("current"),
    upcoming: document.getElementById("upcoming"),
  };

  let symbols = {
    s: "☀",
    p: "⛅",
    o: "☁",
    r: "☂",
    d: "°",
  };

  let upcomingDays = 3;

  $elements.submitButton.addEventListener("click", getWeatherInfo);

  function getWeatherInfo() {
    fetch(baseUrl + "locations.json")
      .then((r) => r.json())
      .then((d) => getInfo(d))
      .catch((e) => console.error(e));

    function getInfo(data) {
      let searchedLocation = $elements.location.value;

      let location = data.find(
        (d) => d.name.toLowerCase() === searchedLocation.toLowerCase()
      );

      $elements.forecast.style.display = "block";

      if (!location) {
        showError();
        return;
      }

      Promise.all([
        fetch(baseUrl + `forecast/today/${location.code}.json`).then((r) =>
          r.json()
        ),
        fetch(baseUrl + `forecast/upcoming/${location.code}.json`).then((r) =>
          r.json()
        ),
      ])
        .then((d) => showWeather(d))
        .catch((e) => console.error(e));

      function showWeather([todayData, upcomingData]) {
        clearWeatherInfo();
        showTodayWeather(todayData);
        showUpcomingWeather(upcomingData);

        function showTodayWeather(todayData) {
          let divLabel = createHtmlElement(
            "div",
            ["label"],
            "Current conditions"
          );

          let divParent = createHtmlElement("div", ["forecasts"]);

          let symbol = todayData.forecast.condition[0].toLowerCase();
          let temperatur = `${todayData.forecast.low}${symbols.d}/${todayData.forecast.high}${symbols.d}`;

          let spanSymbol = createHtmlElement(
            "span",
            ["condition", "symbol"],
            symbols[symbol]
          );

          let spanParent = createHtmlElement("span", ["condition"]);

          let firstSpan = createHtmlElement(
            "span",
            ["forecast-data"],
            todayData.name
          );

          let secondSpan = createHtmlElement(
            "span",
            ["forecast-data"],
            temperatur
          );

          let thirdSpan = createHtmlElement(
            "span",
            ["forecast-data"],
            todayData.forecast.condition
          );

          spanParent.appendChild(firstSpan);
          spanParent.appendChild(secondSpan);
          spanParent.appendChild(thirdSpan);

          divParent.appendChild(spanSymbol);
          divParent.appendChild(spanParent);

          $elements.current.appendChild(divLabel);
          $elements.current.appendChild(divParent);
        }

        function showUpcomingWeather(upcomingData) {
          let divLabel = createHtmlElement(
            "div",
            ["label"],
            "Three-day forecast"
          );

          let divParent = createHtmlElement("div", ["forecast-info"]);

          for (let i = 0; i < upcomingDays; i++) {
            let spanParent = createHtmlElement("span", ["upcoming"]);

            let symbol = upcomingData.forecast[i].condition[0].toLowerCase();
            let temperatur = `${upcomingData.forecast[i].low}${symbols.d}/${upcomingData.forecast[i].high}${symbols.d}`;

            let firstSpan = createHtmlElement(
              "span",
              ["symbol"],
              symbols[symbol]
            );

            let secondSpan = createHtmlElement(
              "span",
              ["forecast-data"],
              temperatur
            );

            let thirdSpan = createHtmlElement(
              "span",
              ["forecast-data"],
              upcomingData.forecast[i].condition
            );

            spanParent.appendChild(firstSpan);
            spanParent.appendChild(secondSpan);
            spanParent.appendChild(thirdSpan);

            divParent.appendChild(spanParent);
          }

          $elements.upcoming.appendChild(divLabel);
          $elements.upcoming.appendChild(divParent);
        }
      }

      clearInputFields();

      function clearInputFields() {
        $elements.location.value = "";
      }

      function clearWeatherInfo() {
        $elements.current.innerHTML = "";
        $elements.upcoming.innerHTML = "";
      }

      function showError() {
        clearWeatherInfo();
        clearInputFields();

        let divError = createHtmlElement(
          "div",
          null,
          "Error! Invalid town name!"
        );

        divError.style.color = "red";

        $elements.current.appendChild(divError);
      }
    }
  }

  function createHtmlElement(
    tagName,
    className,
    textContent,
    attributes,
    event
  ) {
    let element = document.createElement(tagName);

    if (className) {
      element.classList.add(...className);
    }

    if (textContent) {
      element.textContent = textContent;
    }

    if (attributes) {
      attributes.forEach((a) => element.setAttribute(a.key, a.value));
    }

    if (event) {
      element.addEventListener(event.name, event.function);
    }

    return element;
  }
}

attachEvents();
