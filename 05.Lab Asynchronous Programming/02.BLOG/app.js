function attachEvents() {
  let baseUrl = "https://blog-apps-c12bf.firebaseio.com/";

  let $elements = {
    loadButton: document.getElementById("btnLoadPosts"),
    posts: document.getElementById("posts"),
    viewButton: document.getElementById("btnViewPost"),
    postTitle: document.getElementById("post-title"),
    postBody: document.getElementById("post-body"),
    postComments: document.getElementById("post-comments"),
  };

  $elements.loadButton.addEventListener("click", getAllPosts);
  $elements.viewButton.addEventListener("click", getTargetPost);

  function getAllPosts() {
    fetch(baseUrl + "posts.json")
      .then((r) => r.json())
      .then((d) => showInfo(d))
      .catch((e) => console.error(e));

    function showInfo(data) {
      $elements.posts.innerHTML = "";

      Object.keys(data).forEach((element) => {
        let option = document.createElement("option");

        option.value = element;
        option.textContent = data[element].title;

        $elements.posts.appendChild(option);
      });
    }
  }

  function getTargetPost() {
    let targetPostId = $elements.posts.value;

    Promise.all([
      fetch(baseUrl + `posts/${targetPostId}.json`).then((r) => r.json()),
      fetch(baseUrl + "comments.json").then((r) => r.json()),
    ])
      .then((d) => showInfo(d))
      .catch((e) => console.error(e));

    function showInfo([targetPost, comments]) {
      $elements.postTitle.textContent = targetPost.title;
      $elements.postBody.textContent = targetPost.body;

      Object.keys(comments).forEach((element) => {
        $elements.postComments.innerHTML = "";

        if (comments[element].postId === targetPost.id) {
          let li = document.createElement("li");

          li.setAttribute("id", element);
          li.textContent = comments[element].text;

          $elements.postComments.appendChild(li);
        }
      });
    }
  }
}

attachEvents();
