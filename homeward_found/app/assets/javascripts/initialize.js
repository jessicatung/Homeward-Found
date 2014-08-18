$(document).ready(function() {
  //  ---------------------------- MAP
  var mapModel = new MapModel();
  var mapView = new MapView()
  var mapController = new MapController(mapModel);
  mapController.getLocation();
  mapModel.getLostings()
  mapModel.getSightings()


  //  ---------------------------- ROUTES
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel)
  routeController.initialize()


  //  ---------------------------- FORM
  // var formController = new FormController();
  // formController.initialize()


  //  ---------------------------- RIVER
  var riverView       = new RiverView ();
  var riverController = new RiverController ( riverView );
  riverController.start();


  //  ---------------------------- LOGIN
  var loginModel = new LoginModel()
  var loginController = new LoginController(loginModel)
  loginController.initialize()
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