$(document).ready(function () {
      var descriptionInput = $("#post-description");
      var titleInput = $("#post-name");
      var postForm = $("#create-post-button");
      var departmentSelect = $("#department");
      // Adding an event listener for when the form is submitted
      $(postForm).on("click", handleFormSubmit);
      // A function for handling what happens when the form to create a new post is submitted
      function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !descriptionInput.val().trim() || !departmentSelect.val()) {
          return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
          title: titleInput
            .val()
            .trim(),
          body: descriptionInput
            .val()
            .trim(),
          DepartmentId: departmentSelect.val()
        };
        console.log(event.target);
        console.log(newPost);

      }
    });