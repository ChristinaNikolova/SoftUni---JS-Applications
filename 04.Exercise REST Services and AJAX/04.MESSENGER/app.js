function attachEvents() {
  let baseUrl = "https://test-bba1b.firebaseio.com/messenger.json";

  let $elements = {
    submitButton: document.getElementById("submit"),
    author: document.getElementById("author"),
    content: document.getElementById("content"),
    messages: document.getElementById("messages"),
    refreshButton: document.getElementById("refresh"),
  };

  $elements.submitButton.addEventListener("click", addNewMessage);
  $elements.refreshButton.addEventListener("click", getAllMessages);

  function getAllMessages() {
    fetch(baseUrl)
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => showError(e));

    function showInfo(data) {
      $elements.messages.textContent = "";
      let result = "";

      Object.keys(data).forEach((currentId) => {
        result +=
          `${data[currentId].author}: ${data[currentId].content}` + "\n";
      });

      $elements.messages.textContent = result;
    }
  }

  function addNewMessage() {
    let author = $elements.author.value;
    let content = $elements.content.value;

    if (!author || !content) {
      showError();
      return;
    }

    let newMessage = {
      author,
      content,
    };

    fetch(baseUrl, {
      headers: {
        "Text-Content": "application.js",
      },
      method: "POST",
      body: JSON.stringify(newMessage),
    })
      .then(() => getAllMessages())
      .catch((e) => showError(e));

    $elements.author.value = "";
    $elements.content.value = "";
  }

  function showError() {
    $elements.messages.textContent = "";
    $elements.messages.textContent = "Error! All Fields are required!";
    return;
  }
}

attachEvents();
