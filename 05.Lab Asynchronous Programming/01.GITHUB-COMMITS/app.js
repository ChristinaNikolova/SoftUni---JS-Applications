function loadCommits() {
  let baseUrl = "https://api.github.com/repos/{username}/{repo}/commits";

  let $elements = {
    username: document.getElementById("username"),
    repo: document.getElementById("repo"),
    commits: document.getElementById("commits"),
  };

  let username = $elements.username.value;
  let repo = $elements.repo.value;

  fetch(baseUrl.replace("{username}/{repo}", `${username}/${repo}`))
    .then((r) => r.json())
    .then((d) => showInfo(d))
    .catch((e) => showError(e));

  function showInfo(data) {
    $elements.commits.innerHTML = "";

    Object.keys(data).forEach((element) => {
      let li = document.createElement("li");
      li.textContent = `${data[element].commit.author.name}: ${data[element].commit.message}`;
      $elements.commits.appendChild(li);
    });
  }

  function showError(error) {
    let li = document.createElement("li");
    li.textContent = `Error: ${error.statusCode} (${error.statusText})`;
    li.style.color = "red";
    $elements.commits.appendChild(li);
  }

  $elements.username.value = "";
  $elements.repo.value = "";
}
