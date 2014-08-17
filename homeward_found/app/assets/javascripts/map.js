
$(document).ready(function() {
  var mapModel = new MapModel();
  var mapView = new MapView()
  var mapController = new MapController(mapModel);
  mapController.getLocation();
  mapModel.getLostings()
  // mapModel.getSightings()
  // $("h1").on("click", mapModel.addNewMarker(37.780514, -122.415477));
});

function MapController(model){
  this.model = model;
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
    this.model.createMap(position);
  }
}

function MapView(){}

MapView.prototype = {
}

function MapModel(){
  this.map;
  this.markers = [];
  this.iterator = 0;
  this.lostings = [];
  this.sightings = [];
}

MapModel.prototype = {

  createMap: function(position){
    var self = this,
    mapLatitude = position.coords.latitude,
    mapLongitude = position.coords.longitude,
    currentLocation = new google.maps.LatLng(mapLatitude, mapLongitude),
    mapOptions = {
      zoom: 13,
      center: currentLocation
    };


    this.map = new google.maps.Map($("#my_map")[0], mapOptions)
    this.addInitialMarkers(this.map)
    this.setMapBounds()


    google.maps.event.addListener(this.map, 'click', function(event) {
      self.placeMarker(event.latLng);
    });
  },


  addInitialMarkers: function(map){
    this.addInitialLostingMarkers(map)
    // this.addInitialSightingMarkers(map)
  },

  addInitialLostingMarkers: function(map){
    var self = this;
    for (var i = 0; i < this.lostings.length; i++) {

      setTimeout(function() {
        self.markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(self.lostings[self.iterator].Lat), parseFloat(self.lostings[self.iterator].Lng)),
          map: map,
          draggable: false,
          icon: self.animalType(self.lostings[self.iterator].animal_type),
          // animation: google.maps.Animation.DROP
        }));
        self.iterator++;
    }, i ); //* (100 * i)
    }
  },

  // addInitialSightingMarkers: function(map){
  //   var self = this;
  //   for (var i = 0; i < this.sightings.length; i++) {
  //     setTimeout(function() {
  //       self.markers.push(new google.maps.Marker({
  //         position: new google.maps.LatLng(parseFloat(self.sightings[self.iterator].Lat), parseFloat(self.sightings[self.iterator].Lng)),
  //         map: map,
  //         draggable: false,
  //         icon: self.animalType(self.sightings[self.iterator].animal_type),
  //         // animation: google.maps.Animation.DROP
  //       }));
  //       self.iterator++;
  //   }, i ); //* (100 * i)
  //   }
  // },

  addNewMarker: function(lat, lon){
    var newMarkerCoordinate = new google.maps.LatLng(lat, lon)
    this.lostings.push(newMarkerCoordinate);

    this.markers.push(new google.maps.Marker({
      position: this.lostings.last,
      map: this.map,
      draggable: false,
      icon: this.animalType(this.lostings.last.animal_type),
      animation: google.maps.Animation.DROP
    }));
  },

  placeMarker: function(location){
    var marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.addNewMarker(marker.position.k, marker.position.B)
  },

  getLostings: function(){
    $.ajax({
      method: "GET",
      url: "/lostings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.lostings.push(data[i])
      }
    }.bind(this))
  },
  getSightings: function(){
    $.ajax({
      method: "GET",
      url: "/sightings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.sightings.push(data[i])
      }
    }.bind(this))
  },

  setMapBounds: function(){
    var lastValidCenter = this.map.getCenter();
    var allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lastValidCenter.k - 0.03, lastValidCenter.B - 0.03),
      new google.maps.LatLng(lastValidCenter.k - 0.03, lastValidCenter.B - 0.03)
      );

    var map = this.map
    google.maps.event.addListener(this.map, 'center_changed', function() {
      if (allowedBounds.contains(lastValidCenter)) {
        lastValidCenter
      }
      map.panTo(lastValidCenter);
    });
  },

  animalType: function(animal_type){
    if (animal_type === "dog") {
      return "http://placepuppy.it/50/50"
    } else {
      return "http://placekitten.com/g/50/50"
    }
  }
}

