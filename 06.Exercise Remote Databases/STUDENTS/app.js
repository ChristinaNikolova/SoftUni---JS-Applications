function solve() {
  let baseUrl = "https://test-bba1b.firebaseio.com/students.json";

  let $elements = {
    tbody: document.getElementsByTagName("tbody")[0],
    submitBtn: document.getElementById("submitBtn"),
    errorContainer: document.getElementById("errorContainer"),
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    facultyNumber: document.getElementById("facultyNumber"),
    grade: document.getElementById("grade"),
  };

  $elements.submitBtn.addEventListener("click", addNewStudent);

  fetch(baseUrl)
    .then((r) => r.json())
    .then((d) => showInfo(d))
    .catch((e) => console.error(e));

  $elements.errorContainer.textContent = "";

  function showInfo(data) {
    $elements.tbody.innerHTML = "";

    Object.keys(data).forEach((elementId) => {
      let currrentRow = document.createElement("tr");
      currrentRow.innerHTML = `
          <td>${data[elementId].id}</td>
          <td>${data[elementId].firstName}</td>
          <td>${data[elementId].lastName}</td>
          <td>${data[elementId].facultyNumber}</td>
          <td>${data[elementId].grade}</td>`;

      $elements.tbody.appendChild(currrentRow);
    });
  }

  function addNewStudent() {
    event.preventDefault();

    let firstName = $elements.firstName.value;
    let lastName = $elements.lastName.value;
    let facultyNumber = $elements.facultyNumber.value;
    let grade = $elements.grade.value;

    let errorMessage = "";

    if (!firstName || !lastName || !facultyNumber || !grade) {
      errorMessage += "All fields are REQUIRED!" + "\n";
    }

    if (grade < 2.0 || grade > 6.0) {
      errorMessage += "Grade must be between 2.00 and 6.00!";
    }

    if (errorMessage !== "") {
      $elements.errorContainer.textContent = errorMessage;
      $elements.errorContainer.style.color = "red";
      errorMessage = "";
      clearInputData();
      return;
    }

    grade = (+grade).toFixed(2);
    id = $elements.tbody.children.length;

    let newStudent = {
      id,
      firstName,
      lastName,
      facultyNumber,
      grade,
    };

    fetch(baseUrl, {
      headers: {
        "Text-Content": "application.json",
      },
      method: "POST",
      body: JSON.stringify(newStudent),
    })
      .then(() => solve())
      .catch((e) => console.error(e));

    clearInputData();

    function clearInputData() {
      $elements.firstName.value = "";
      $elements.lastName.value = "";
      $elements.facultyNumber.value = "";
      $elements.grade.value = "";
    }
  }
}

solve();
