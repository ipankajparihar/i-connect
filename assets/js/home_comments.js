// {
//   // create comment

//   let createComment = function () {
//     let newCommentForm = $(".create-comment-form");
//     newCommentForm.submit(function (e) {
//       e.preventDefault();

//       $.ajax({
//         type: "post",
//         url: "/comments/create",
//         data: newCommentForm.serialize(),
//         success: function (data) {
//           let newComment = newCommentDom(data.data.comment);
//           $(`#post-comments-${data.data.comment.post_id}`).prepend(newComment);
//           deleteComment($(" .delete-comment-btn", newComment));
//           console.log(data);
//           new Noty({
//             theme: "relax",
//             text: "Comment published!",
//             type: "success",
//             layout: "topRight",
//             timeout: 1500,
//           }).show();
//         },
//         error: function (error) {
//           console.log(error.responseText);
//         },
//       });
//     });
//   };

//   //showing the comment in dom
//   let newCommentDom = function (comment) {
//     return $(`
//     <li id="comment-${comment._id}">
//     <small>
//     <a id ="delete-comment-btn" href="/comments/destroy/${comment._id}"> X</a>
//   </small>
//   <small>${comment.content}</small>
//   <br />
//   <small> ${comment.user.name} </small>

//   </li>
//     `);
//   };

//   let deleteComment = function (deleteLink) {
//     $(deleteLink).click((e) => {
//       e.preventDefault();

//       $.ajax({
//         type: "delete",
//         url: $(deleteLink).prop("href"),
//         success: function (data) {
//           $(`comment-${data.data.comment_id}`).remove();
//           new Noty({
//             theme: "relax",
//             text: "Comment Deleted",
//             type: "success",
//             layout: "topRight",
//             timeout: 1500,
//           }).show();
//         },
//         error: function (error) {
//           console.log(error);
//         },
//       });
//     });
//   };

//   createComment();
//   $(".delete-comment-btn").each(function () {
//     deleteComment(this);
//   });
// }

// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = `.create-${postId}-comment-form`;

    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));
          new ToggleLike($(" .toggle-like-button", newComment));
          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
    return $(`<li id="comment-${comment._id}">
                      <p>
                          
                          <small>
                              <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                          </small>
                          
                          ${comment.content}
                          <br>
                          <small>
                              ${comment.user.name}
                          </small>
                          <small>
                          <a class="toggle-like-btn" data-likes="0" href="likes/toggle/?id=${comment._id}&type=Comment">
        0 Likes</a
      >
                          </small>
                          
                      </p>    

              </li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
