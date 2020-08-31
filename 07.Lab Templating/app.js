async function solve() {
  let $elements = {
    allContacts: document.getElementById("allContacts"),
  };

  Handlebars.registerPartial(
    "contact",
    await fetch("./template-singleContact.hbs").then((r) => r.text())
  );

  let template = Handlebars.compile(
    await fetch("./template-contacts.hbs").then((r) => r.text())
  );

  let result = template({ contacts });
  $elements.allContacts.innerHTML += result;

  let $buttons = document.getElementsByClassName("detailsBtn");

  Array.from($buttons).forEach((button) => {
    button.addEventListener("click", showDetails);
  });

  function showDetails(event) {
    let parent = event.target.parentElement;

    if (!parent.children[2].hasAttribute("style")) {
      parent.children[2].style.display = "none";
    }

    if (parent.children[2].style.display === "none") {
      parent.children[2].style.display = "block";
    } else {
      parent.children[2].style.display = "none";
    }
  }
}

solve();
