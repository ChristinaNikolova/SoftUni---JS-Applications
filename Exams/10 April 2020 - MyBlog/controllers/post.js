import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    details(context) {
      let { postId } = context.params;

      models.post
        .details(postId)
        .then((response) => {
          let post = docModifier(response);

          context.post = post;

          Object.keys(post).forEach((key) => {
            context[key] = post[key];
          });

          extend(context).then(function () {
            this.partial("../views/post/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let { postId } = context.params;

      models.post
        .details(postId)
        .then((response) => {
          let post = docModifier(response);

          if (post.creator !== localStorage.getItem("userEmail")) {
            alert("Only post's creator can edit the post!");
            context.redirect("#/home");
            return;
          }

          context.post = post;

          Object.keys(post).forEach((key) => {
            context[key] = post[key];
          });

          models.post.getAll().then((response) => {
            let posts = response.docs.map(docModifier);

            context.posts = posts;

            extend(context).then(function () {
              this.partial("../views/post/edit.hbs");
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    create(context) {
      let data = {
        ...context.params,
        creator: localStorage.getItem("userEmail"),
      };

      models.post
        .create(data)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { postId } = context.params;

      models.post
        .details(postId)
        .then((response) => {
          let post = docModifier(response);

          if (post.creator !== localStorage.getItem("userEmail")) {
            alert("Only post's creator can delete the post!");
            context.redirect("#/home");
            return;
          }

          return models.post.delete(postId);
        })
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    update(context) {
      let { postId, title, category, content } = context.params;

      models.post
        .details(postId)
        .then((response) => {
          let post = docModifier(response);

          post.title = title;
          post.category = category;
          post.content = content;

          return models.post.update(postId, post);
        })
        .then((response) => {
          context.redirect(`#/post/details/${postId}`);
        })
        .catch((e) => console.error(e));
    },
  },
};
