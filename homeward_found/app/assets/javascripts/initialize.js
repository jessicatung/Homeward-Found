// <3 acreilly.  You understand Javascript and the rant about widgets.  You've
// clearly worked hard to implement that here.  Thank you.

$(document).ready(function() {
  //  ---------------------------- MAP
  var mapModel = new MapModel();
  // This doesn't seem to do anything (since you're using Google to provide you
  // the view....no need to instantiate something that isn't used).
  var mapView = new MapView()
  var mapController = new MapController(mapModel);

  // Good, but these things should be called by the MVC's "innards"
  mapController.getLocation(); // controller calls this on initialization?
  mapModel.getLostings() // controller invokes this on the `this.model` instance?
  mapModel.getSightings()// controller invokes this on the `this.model` instance?


  //  ---------------------------- ROUTES
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel)
  routeController.initialize()


  //  ---------------------------- FORM
  var formController = new FormController();
  formController.initialize()


  // FLOP, TURN, RIVER :P  FULL HOUSE!
  //  ---------------------------- RIVER
  var riverView       = new RiverView (); // OK that's unconventional, a space between the function and the ()
  var riverController = new RiverController ( riverView );
  riverController.start();


  //  ---------------------------- LOGIN
  var loginModel = new LoginModel()
  var loginController = new LoginController(loginModel)
  loginController.initialize()
  // Is that strictly aesthetic?
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
