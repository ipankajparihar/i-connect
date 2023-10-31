{
  //method to submit the data for new post using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-btn", newPost));
          new PostComments(data.data.post._id);
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "post created!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create post in dom

  let newPostDom = function (post) {
    return $(`
    <li id="post-${post._id}">
  
  <small>
    <a class="delete-post-btn" href="posts/destroy/${post._id}"> X</a>
  </small>
  
  <h2>${post.content}</h2>

<small> ${post.user.name} </small>

<small>
<a class="toggle-like-btn" data-likes="0" href="likes/toggle/?id=${post._id}&type=Post">
0 Likes</a
>
</small>
  <div id="comment-container">
   

    <form action="comments/create" method="POST">
      <input
        type="text"
        name="content"
        placeholder="write comment here"
        required
      />
      <input type="hidden" name="post" value="${post._id}>" />
      <input type="submit" value="Add Comment" />
    </form>
   

    <div class="post-comment-list">
      <ul id="post-comments-${post._id}">
        
      </ul>
    </div>
  </div>
</li>
    `);
  };

  //method to delete from dom
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  };

  createPost();
  deletePost();
}
