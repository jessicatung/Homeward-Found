$(document).ready(function() {
  var mapModel = new MapModel();
  var mapView = new MapView()
  var routeModel = new RouteModel();
  var routeController = new RouteController(routeModel)
  routeController.initialize()
  var formController = new FormController();
  formController.initialize()
  var mapController = new MapController(mapModel);
  mapController.getLocation();
  mapModel.getLostings()
  mapModel.getSightings()
});