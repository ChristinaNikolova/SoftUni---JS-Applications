function getInfo() {
  let baseUrl = "https://judgetests.firebaseio.com/businfo/{busId}.json";

  let $elements = {
    stopId: document.getElementById("stopId"),
    stopName: document.getElementById("stopName"),
    buses: document.getElementById("buses"),
  };

  let busId = $elements.stopId.value;

  fetch(baseUrl.replace("{busId}", busId))
    .then((r) => r.json())
    .then((d) => showInfo(d))
    .catch((e) => showError(e));

  function showInfo(data) {
    $elements.buses.innerHTML = "";
    $elements.stopName.textContent = data.name;

    Object.keys(data.buses).forEach((busId) => {
      let li = document.createElement("li");
      li.textContent = `Bus ${busId} arrives in ${data.buses[busId]} minutes!`;
      $elements.buses.appendChild(li);
    });
  }

  function showError() {
    $elements.buses.innerHTML = "";
    $elements.stopName.textContent = "Error! Not existing such Bus!";
    return;
  }
}
