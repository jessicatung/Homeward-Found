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
  var routeView = new RouteView()
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel,routeView)
  routeController.initialize()

  //  ---------------------------- FORM
  var formController = new FormController();
  formController.initialize()


  //  ---------------------------- RIVER
  // var riverView = new RiverView();
  // var riverController = new RiverController(riverView);
  // riverController.startLostings();



  //  ---------------------------- LOGIN
  var loginModel = new LoginModel()
  var loginController = new LoginController(loginModel)
  loginController.initialize()
  $("#aside_nav").on("click", "#lost_side", lostingRiverLoad)
  $("#aside_nav").on("click", "#sight_side", sightingRiverLoad)
  $("#event-container").on("submit", "#new_sighting", routeModel.createSighting)
  $("#event-container").on("submit", "#new_losting", routeModel.createLosting)

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

function formSubmission(){
if(this.id === "new_losting"){
routeModel.createLosting
}else {
routeModel.createSighting
}
}