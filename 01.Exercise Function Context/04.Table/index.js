function solve() {
  let $elements = {
    table: document.querySelector("body > table > tbody"),
  };

  $elements.table.addEventListener("click", selectRow);

  function selectRow(event) {
    let currentRow = event.target.parentElement;

    if (currentRow.style.backgroundColor === "rgb(65, 63, 94)") {
      currentRow.style.backgroundColor = "";
      return;
    }

    Array.from($elements.table.children).forEach((row) => {
      if (row.style.backgroundColor === "rgb(65, 63, 94)") {
        row.style.backgroundColor = "";
      }
    });

    currentRow.style.backgroundColor = "rgb(65, 63, 94)";
  }
}
