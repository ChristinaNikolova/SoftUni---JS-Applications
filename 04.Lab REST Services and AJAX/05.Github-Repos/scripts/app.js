function loadRepos() {
  let baseUrl = "https://api.github.com/users/{username}/repos";

  let $elements = {
    username: document.getElementById("username"),
    repos: document.getElementById("repos"),
  };

  let username = $elements.username.value;

  fetch(baseUrl.replace("{username}", username))
    .then((r) => r.json())
    .then((d) => showInfo(d))
    .catch((e) => showError(e));

  function showInfo(data) {
    $elements.repos.innerHTML = "";

    data.forEach((element) => {
      let li = document.createElement("li");
      let a = document.createElement("a");

      a.href = element.html_url;
      a.textContent = element.full_name;

      li.appendChild(a);
      $elements.repos.appendChild(li);
    });
  }

  function showError() {
    let li = document.createElement("li");
    li.textContent = "Not Found";
    $elements.repos.appendChild(li);
  }

  $elements.username.value = "";
}
