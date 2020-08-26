function attachEvents() {
  let baseUrl = "https://test-bba1b.firebaseio.com/phonebook";

  let $elements = {
    loadButton: document.getElementById("btnLoad"),
    phonebook: document.getElementById("phonebook"),
    createButton: document.getElementById("btnCreate"),
    person: document.getElementById("person"),
    phone: document.getElementById("phone"),
  };

  $elements.loadButton.addEventListener("click", loadAllContacts);
  $elements.createButton.addEventListener("click", addNewContact);

  function addNewContact() {
    let person = $elements.person.value;
    let phone = $elements.phone.value;

    if (!person || !phone) {
      return;
    }

    let newContact = {
      person,
      phone,
    };

    fetch(baseUrl + ".json", {
      headers: {
        "Text-Content": "application.js",
      },
      method: "POST",
      body: JSON.stringify(newContact),
    })
      .then(() => loadAllContacts())
      .catch((e) => showError(e));

    $elements.person.value = "";
    $elements.phone.value = "";
  }

  function loadAllContacts() {
    fetch(baseUrl + ".json")
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => showError(e));

    function showInfo(data) {
      $elements.phonebook.innerHTML = "";

      Object.keys(data).forEach((currentId) => {
        let li = document.createElement("li");
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteContact);

        li.textContent = `${data[currentId].person}: ${data[currentId].phone}`;
        li.appendChild(deleteButton);

        $elements.phonebook.appendChild(li);

        function deleteContact() {
          fetch(baseUrl + `/${currentId}.json`, {
            method: "DELETE",
          })
            .then(() => loadAllContacts())
            .catch((e) => showError(e));
        }
      });
    }
  }

  function showError() {
    $elements.phonebook.innerHTML = "";

    let li = document.createElement("li");
    li.textContent = "Phonebook is empty";
    $elements.phonebook.appendChild(li);
  }
}

attachEvents();
