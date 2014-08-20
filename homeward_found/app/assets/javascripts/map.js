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
    this.model.pollForUpdates();
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
    // this.setMapBounds()

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

  pollForUpdates: function() {
    var currentCenter = this.map.getCenter();
    var lastCenter = currentCenter;
    var self = this;

    intervalId = setInterval(function() {
      currentCenter = self.map.getCenter();
      if(lastCenter === currentCenter) {
        $.ajax({
          url: "/lostings/relevant_listings",
          type: "GET",
          data: { coords: {lat: currentCenter.k, lng: currentCenter.B} }
        }).done ( function(data){
          $(document).trigger("relevantLostingsRefresh", data)
        })
        $.ajax({
          url: "/sightings/relevant_listings",
          type: "GET",
          data: { coords: {lat: currentCenter.k, lng: currentCenter.B} }
        }).done ( function(data){
          $(document).trigger("relevantSightingsRefresh", data)
        })
      }
    })
  }
}






