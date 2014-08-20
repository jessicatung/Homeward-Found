$(document).ready(function() {

  // window.onload = function() {setTimeout(function(){document.body.style.opacity="100";},500);};

      setTimeout(function() {
        $('#bigloading').addClass('ready');
      }, 4000);
//  ---------------------------- MAP
  var mapModel = new MapModel();
  var lostings = new Lostings();
  var sightings = new Sightings();
  var markerView = new MarkerView();
  var markerModel = new Marker(lostings, sightings, markerView)
  var markersController = new MarkersController(markerModel, markerView)
  var mapController = new MapController(mapModel, markersController);
  mapController.getLocation();
  lostings.getLostings()
  sightings.getSightings()

  //  ---------------------------- ROUTES
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel, mapController)
  routeController.initialize()

  //  ---------------------------- FORM
  var formController = new FormController();
  formController.initialize()

  //  ---------------------------- RIVER
  var riverView = new RiverView();
  var riverController = new RiverController(riverView);
  riverController.startLostings();

  //  ---------------------------- LOGIN
  var loginView = new LoginView()
  var loginController = new LoginController(loginView)
  loginController.initialize()

// ------------------------------- EVENT LISTENERS

  $("#aside_nav").on("click", "#lost_side", riverController.startLostings)
  $("#aside_nav").on("click", "#sight_side", riverController.startSightings)
  $("#lost_side").on("click", routeModel.lostingRiver);
  $("#sight_side").on("click", routeModel.sightingRiver);


  $("#event-container").on("submit", "#new_losting", routeModel.createLosting)
  $("#event-container").on("submit", "#new_sighting", routeModel.createSighting)

});