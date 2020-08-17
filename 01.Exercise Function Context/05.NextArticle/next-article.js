function getArticleGenerator(articles) {
  let copyArticles = articles;

  let $articleBox = document.getElementById("content");

  return function () {
    if (copyArticles.length === 0) {
      return;
    }

    let currentArticle = copyArticles.shift();
    let article = document.createElement("article");
    article.textContent = currentArticle;

    $articleBox.appendChild(article);
  };
}
