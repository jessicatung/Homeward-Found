
$(document).ready(function() {
  var mapModel = new MapModel();
  var mapController = new MapController(mapModel);
  mapController.getLocation();
  $("h1").on("click", mapModel.addNewMarker(37.780514, -122.415477))
});

function MapController(model){
  this.model = model
}

MapController.prototype = {
  getLocation: function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initialize.bind(this));
    } else {
      console.log( "Geolocation is not supported by this browser.");
    }
  },

  initialize: function(position){
    this.model.createMap(position)
  }
}

function MapModel(){
  var map;
  this.map;
  this.markers = [];
  this.iterator = 0;

  this.lostings = [
  new google.maps.LatLng(37.7846330,-122.3974140),
  new google.maps.LatLng(37.7959230,-122.3920520),
  new google.maps.LatLng(37.7698250,-122.4667820),
  ];
}

MapModel.prototype = {
  createMap: function(position){
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    mapOptions = {
      zoom: 13,
      center: currentLocation
    }
    this.map = new google.maps.Map(document.getElementById('my_map'), mapOptions)
    this.addInitialMarkers(this.map);
  },
  // setMapBounds: function(){

  //   var allowedBounds = new google.maps.LatLngBounds(
  //     new google.maps.LatLng(37.717462, -122.541557),
  //     new google.maps.LatLng(37.817099, -122.378865)
  //     );

  //   var lastValidCenter = this.map.getCenter();

  //   google.maps.event.addListener(this.map, 'center_changed', function() {
  //     if (allowedBounds.contains(this.map.getCenter())) {
  //       lastValidCenter = this.map.getCenter();
  //       return;
  //     }
  //     this.map.panTo(lastValidCenter);
  //   });
  // },
  addInitialMarkers: function(map){
    var self = this;
    for (var i = 0; i < this.lostings.length; i++) {
      setTimeout(function() {
        self.markers.push(new google.maps.Marker({
          position: self.lostings[self.iterator],
          map: map,
          draggable: false,
      // icon: image,
      animation: google.maps.Animation.DROP
    }));
        self.iterator++;
      }, i * (200 * i));
    }
  },

  addNewMarker: function(lat, lon){
    var newMarkerCoordinate = new google.maps.LatLng(lat, lon)
    this.lostings.push(newMarkerCoordinate);

    this.markers.push(new google.maps.Marker({
      position: this.lostings.last,
      map: this.map,
      draggable: false,
        // icon: image,
        animation: google.maps.Animation.DROP
      }));
  }
}

