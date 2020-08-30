function solve() {
  let baseUrl = "https://test-bba1b.firebaseio.com/books";

  let $elements = {
    loadBooks: document.getElementById("loadBooks"),
    tbody: document.getElementsByTagName("tbody")[0],
    exampleRow: document.querySelector("body > table > tbody > tr"),
    submitButton: document.getElementById("submitBtn"),
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    isbn: document.getElementById("isbn"),
  };

  $elements.loadBooks.addEventListener("click", getAllBooks);
  $elements.submitButton.addEventListener("click", addNewBook);

  function addNewBook() {
    event.preventDefault();

    let title = $elements.title.value;
    let author = $elements.author.value;
    let isbn = $elements.isbn.value;

    let newBook = {
      title,
      author,
      isbn,
    };

    fetch(baseUrl + ".json", {
      headers: {
        "Context-Content": "application.json",
      },
      method: "POST",
      body: JSON.stringify(newBook),
    })
      .then(() => getAllBooks())
      .catch((e) => console.error(e));

    $elements.title.value = "";
    $elements.author.value = "";
    $elements.isbn.value = "";
  }

  function getAllBooks() {
    fetch(baseUrl + ".json")
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => console.error(e));

    function showInfo(data) {
      $elements.tbody.innerHTML = "";

      Object.keys(data).forEach((bookId) => {
        let currentRow = $elements.exampleRow.cloneNode(true);

        currentRow.setAttribute("data-id", bookId);

        currentRow.children[0].innerHTML = data[bookId].title;
        currentRow.children[1].innerHTML = data[bookId].author;
        currentRow.children[2].innerHTML = data[bookId].isbn;

        currentRow.children[3].children[0].addEventListener(
          "click",
          updateBook
        );
        currentRow.children[3].children[1].addEventListener(
          "click",
          deleteBook
        );

        $elements.tbody.appendChild(currentRow);
      });
    }
  }

  function updateBook(event) {
    let bookIdToUpdate = event.target.parentElement.parentElement.getAttribute(
      "data-id"
    );

    let targetBookToUpdate = event.target.parentElement.parentElement;

    $elements.title.value = targetBookToUpdate.children[0].textContent;
    $elements.author.value = targetBookToUpdate.children[1].textContent;
    $elements.isbn.value = targetBookToUpdate.children[2].textContent;

    let updatedBook = {
      title,
      author,
      isbn,
    };

    fetch(baseUrl + `/${bookIdToUpdate}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedBook),
    })
      .catch((e) => console.error(e));
  }

  function deleteBook(event) {
    let bookIdToDelete = event.target.parentElement.parentElement.getAttribute(
      "data-id"
    );

    fetch(baseUrl + `/${bookIdToDelete}.json`, {
      method: "DELETE",
    })
      .then(() => getAllBooks())
      .catch((e) => console.error(e));
  }
}

solve();
