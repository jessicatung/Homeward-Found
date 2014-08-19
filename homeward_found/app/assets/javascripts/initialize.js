$(document).ready(function() {
  //  ---------------------------- MAP
  var mapModel = new MapModel();
  var lostings = new Lostings();
  var sightings = new Sightings()
  var markers = new Marker(lostings, sightings)
  var mapController = new MapController(mapModel, markers);
  mapController.getLocation();
  lostings.getLostings()
  sightings.getSightings()
  // mapController.initialize();
  //  ---------------------------- ROUTES
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel)
  routeController.initialize()

  $("#new_losting").on("ajax:success", routeModel.lostingRiver);

  //  ---------------------------- FORM
  var formController = new FormController();
  formController.initialize()


  //  ---------------------------- RIVER
  var riverView       = new RiverView ();
  var riverController = new RiverController ( riverView );
  riverController.startLostings();



  //  ---------------------------- LOGIN
  var loginModel = new LoginModel()
  var loginController = new LoginController(loginModel)
  loginController.initialize()


$("#event-container").on("submit", "#new_losting", routeModel.createLosting)
});
