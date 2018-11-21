$(document).ready(function() {
    // Getting references to the name input and department container, as well as the table body
    var nameInput = $("#department-name");
    var departmentList = $("tbody");
    var departmentContainer = $(".department-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#department-form", handleDepartmentFormSubmit);
    $(document).on("click", ".delete-department", handleDeleteButtonPress);
  
    // Getting the initial list of departments
    getDepartments();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handleDepartmentFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertDepartment({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getdepartments upon completion
    function upsertDepartment(departmentData) {
      $.post("/api/departments", departmentData)
        .then(getDepartments);
    }
  
    // Function for creating a new list row for departments
    function createDepartmentRow(departmentData) {
      console.log(departmentData);
      var newTr = $("<tr>");
      newTr.data("department", departmentData);
      newTr.append("<td>" + departmentData.name + "</td>");
      newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
      newTr.append("<td><a href='/blog?department_id=" + departmentData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href='/cms?department_id=" + departmentData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-department'>Delete Department</a></td>");
      return newTr;
    }
  
    // Function for retrieving Departments and getting them ready to be rendered to the page
    function getDepartments() {
      $.get("/api/departments", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createDepartmentRow(data[i]));
        }
        renderDepartmentList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of departments to the page
    function renderDepartmentList(rows) {
      departmentList.children().not(":last").remove();
      departmentContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        departmentList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no departments
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Author before you can create a Post.");
      departmentContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("department");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/department/" + id
      })
        .then(getDepartments);
    }
  });
  