function attachEvents() {
  let baseUrl = "https://fisher-game.firebaseio.com/catches";

  let $elements = {
    loadButton: document.getElementsByClassName("load")[0],
    catches: document.getElementById("catches"),
    exampleRow: document.getElementsByClassName("catch")[0],
    addButton: document.getElementsByClassName("add")[0],
    addForm: document.getElementById("addForm"),
  };

  $elements.loadButton.addEventListener("click", getAllCatches);
  $elements.addButton.addEventListener("click", addNewCatch);

  function addNewCatch() {
    event.preventDefault();

    let angler = $elements.addForm.children[2].value;
    let weight = $elements.addForm.children[4].value;
    let species = $elements.addForm.children[6].value;
    let location = $elements.addForm.children[8].value;
    let bait = $elements.addForm.children[10].value;
    let captureTime = $elements.addForm.children[12].value;

    let newCatch = {
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    };

    fetch(baseUrl + ".json", {
      headers: {
        "Text-Content": "application.json",
      },
      method: "POST",
      body: JSON.stringify(newCatch),
    })
      .then(() => getAllCatches())
      .catch((e) => console.error(e));

    clearInputForm();

    function clearInputForm() {
      $elements.addForm.children[2].value = "";
      $elements.addForm.children[4].value = "";
      $elements.addForm.children[6].value = "";
      $elements.addForm.children[8].value = "";
      $elements.addForm.children[10].value = "";
      $elements.addForm.children[12].value = "";
    }
  }

  function getAllCatches() {
    fetch(baseUrl + ".json")
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => console.error(e));

    function showInfo(data) {
      $elements.catches.innerHTML = "";

      Object.keys(data).forEach((catchId) => {
        let currentRow = $elements.exampleRow.cloneNode(true);

        currentRow.setAttribute("data-id", catchId);

        currentRow.children[1].value = data[catchId].angler;
        currentRow.children[4].value = data[catchId].weight;
        currentRow.children[7].value = data[catchId].species;
        currentRow.children[10].value = data[catchId].location;
        currentRow.children[13].value = data[catchId].bait;
        currentRow.children[16].value = data[catchId].captureTime;

        currentRow.children[18].addEventListener("click", updateCatch);
        currentRow.children[19].addEventListener("click", deleteCatch);

        $elements.catches.appendChild(currentRow);
      });
    }
  }

  function updateCatch(event) {
    let catchIdToUpdate = event.target.parentElement.getAttribute("data-id");
    let catchToUpdate = event.target.parentElement;

    let angler = catchToUpdate.children[1].value;
    let weight = catchToUpdate.children[4].value;
    let species = catchToUpdate.children[7].value;
    let location = catchToUpdate.children[10].value;
    let bait = catchToUpdate.children[13].value;
    let captureTime = catchToUpdate.children[16].value;

    let updatedCatch = {
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    };

    fetch(baseUrl + `/${catchIdToUpdate}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedCatch),
    })
      .then(() => getAllCatches())
      .catch((e) => console.error(e));
  }

  function deleteCatch(event) {
    let catchIdToDelete = event.target.parentElement.getAttribute("data-id");

    fetch(baseUrl + `/${catchIdToDelete}.json`, {
      method: "DELETE",
    })
      .then(() => getAllCatches())
      .catch((e) => console.error(e));
  }
}

attachEvents();
