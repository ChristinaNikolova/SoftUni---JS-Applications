function solve() {
  let baseUrl = "https://judgetests.firebaseio.com/schedule/";

  let $elements = {
    departButton: document.getElementById("depart"),
    arriveButton: document.getElementById("arrive"),
    infoBox: document.getElementsByClassName("info")[0],
  };

  let currentStop = "depot";
  let nextStop = "depot";

  function depart() {
    fetch(baseUrl + `${nextStop}.json`)
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => showError(e));

    function showInfo(data) {
      currentStop = data.name;
      nextStop = data.next;

      $elements.infoBox.textContent = `Next stop ${currentStop}`;
      changeButtons();
    }
  }

  function arrive() {
    $elements.infoBox.textContent = `Arriving at ${currentStop}`;
    changeButtons();
  }

  function changeButtons() {
    if ($elements.departButton.disabled) {
      $elements.departButton.disabled = false;
      $elements.arriveButton.disabled = true;
    } else {
      $elements.departButton.disabled = true;
      $elements.arriveButton.disabled = false;
    }
  }

  function showError() {
    $elements.infoBox.textContent = "Error!";
    $elements.arriveButton.disabled = true;
    $elements.departButton.disabled = true;
    return;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
