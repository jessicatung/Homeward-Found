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

  //  ---------------------------- FORM
  var formController = new FormController();
  formController.initialize()


  //  ---------------------------- RIVER
  // var riverView = new RiverView();
  // var riverController = new RiverController(riverView);
  // riverController.startLostings();

// $("#new_losting").on("ajax:success", routeModel.lostingRiver);

  //  ---------------------------- LOGIN
  var loginModel = new LoginModel()
  var loginController = new LoginController(loginModel)
  loginController.initialize()
  $("#aside_nav").on("click", "#lost_side", lostingRiverLoad)
  $("#aside_nav").on("click", "#sight_side", sightingRiverLoad)
  $("#lost_side").on("click", routeModel.lostingRiver);
  $("#sight_side").on("click", routeModel.sightingRiver);


  $("#event-container").on("submit", "#new_losting", routeModel.createLosting)
  $("#event-container").on("submit", "#new_sighting", routeModel.createSighting)

});

  function lostingRiverLoad(){
    var riverView = new RiverView();
    var riverController = new RiverController(riverView);
    riverController.startLostings()
  }

  function sightingRiverLoad(){
    var riverView = new RiverView();
    var riverController = new RiverController(riverView);
    riverController.startSightings()
  }