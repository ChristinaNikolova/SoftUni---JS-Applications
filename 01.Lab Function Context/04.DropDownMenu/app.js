function solve() {
  let $elements = {
    buttonDropDown: document.getElementById("dropdown"),
    dropDwonMenu: document.getElementById("dropdown-ul"),
    box: document.getElementById("box"),
  };

  $elements.buttonDropDown.addEventListener("click", showDropDownMenu);
  $elements.dropDwonMenu.addEventListener("click", changeBoxColor);

  function showDropDownMenu() {
    if ($elements.dropDwonMenu.style.display === "block") {
      $elements.dropDwonMenu.style.display = "none";
      $elements.box.style.backgroundColor = "black";
      $elements.box.style.color = "white";
    } else {
      $elements.dropDwonMenu.style.display = "block";
    }
  }

  function changeBoxColor(event) {
    let color = event.target.textContent;
    $elements.box.style.backgroundColor = color;
    $elements.box.style.color = "black";
  }
}
