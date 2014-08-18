function MapController(model, markers){
  this.model = model;
  this.markers = markers;
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
    this.markers.initializeMarkers(this.model.map)
    this.markers.setAllMap(this.model.map)
    this.markers.showMarkers(this.model.map)
    // this.lostings.getLostings()
    // this.lostings.addInitialLostingMarkers(this.model.map)
  }
}


// === MAP ===================


function MapModel(){
  this.map;
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
    // this.addInitialMarkers(this.map)
    this.setMapBounds()

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
  }
}

// === LOSTINGS ===================

function Lostings(){
  this.animalArray = [];
  this.iterator = 0;
}

Lostings.prototype = {
  getLostings: function(){
    $.ajax({
      method: "GET",
      url: "/lostings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.animalArray.push(data[i])
      }
    }.bind(this))
  }
}


// === SIGHTINGS ===================


function Sightings(){
  this.animalArray = [];
  this.iterator = 0;
}

Sightings.prototype = {
  getSightings: function(){
    $.ajax({
      method: "GET",
      url: "/sightings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.sightings.push(data[i])
      }
    }.bind(this))
  }
}