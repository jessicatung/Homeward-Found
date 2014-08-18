$( document ).ready( function () {

  // wait 2 seconds then call popup
  setTimeout(popup, 500);

  // show form div
  function popup() {
      $("#logindiv").css("display", "block")
  }

  // when click on the login button, form goes away
  $("#loginbtn").click( function () {

    // // AJAX call needs to go here, sending off user info

    $("#logindiv").remove()

    // // may need validations within JS ???

  });
});
