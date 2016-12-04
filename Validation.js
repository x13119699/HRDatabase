// Francesco // addition of validation form 

$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='name of form']").validate({
    // Specify validation rules
    rules: {
      fullname: "required",
      Gender: "required",
      department: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        department: true
      },
      empNumber: {
        required: true,
        minlength: 5
      }
    },
    // validation error messages
    messages: {
      fullname: "Please enter your firstname",
      Gender: "Please enter your Gender",
      department: {
        required: "Please provide a department",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});