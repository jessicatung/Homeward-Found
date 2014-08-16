
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
    // this.model.setMapBounds()
    // var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    // var mapOptions = {
    //   zoom: 13,
    //   center: currentLocation
    // };

    // var map = new google.maps.Map(document.getElementById('my_map'), mapOptions)
    // this.model.map
    // this.model.addInitialMarkers(map);
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
  // addMarker: function(animal, map){

  //   image = "http://placekitten.com/g/50/50"
  //   if (animal === "dog") {
  //     image = "http://placepuppy.it/50/50"
  //   }

  //   this.markers.push(new google.maps.Marker({
  //     position: this.lostings[this.iterator],
  //     map: map,
  //     draggable: false,
  //     icon: image,
  //     animation: google.maps.Animation.DROP
  //   }));
  //   this.iterator++;
  // },
  // drop: function(map){
  //   var self = this;
  //   for (var i = 0; i < this.lostings.length; i++) {
  //     setTimeout(function() {
  //       self.addMarker("cat", map);
  //     }, i * (200 * i));
  //   }
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


// =========== Original Code ==============================

// $(document).ready(function() {

//   var lostings = [
//   new google.maps.LatLng(37.7846330,-122.3974140),
//   new google.maps.LatLng(37.7959230,-122.3920520),
//   new google.maps.LatLng(37.7698250,-122.4667820),
//   ];

//   var markers = [];
//   var iterator = 0;

//   var map;

// //------
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(initialize);
//   } else {
//     console.log( "Geolocation is not supported by this browser.");
//   }
// }

// function initialize(position) {
//   console.log('HERE IS THE LOCATION')
//   console.log(position)
//   var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
//   console.log(position.coords.longitude)
//   var mapOptions = {
//     zoom: 13,
//     center: currentLocation
//   };

//   map = new google.maps.Map(document.getElementById('my_map'),
//     mapOptions);

//   drop();

//   var allowedBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(37.717462, -122.541557),
//     new google.maps.LatLng(37.817099, -122.378865)
//     );

//   var lastValidCenter = map.getCenter();

//   google.maps.event.addListener(map, 'center_changed', function() {
//     if (allowedBounds.contains(map.getCenter())) {
//       lastValidCenter = map.getCenter();
//       return;
//     }
//     map.panTo(lastValidCenter);
//   });
// }

// // -----

// function drop() {
//   for (var i = 0; i < lostings.length; i++) {
//     setTimeout(function() {
//       addMarker();
//     }, i * (200 * i));
//   }
// }

// function addMarker() {
//   markers.push(new google.maps.Marker({
//     position: lostings[iterator],
//     map: map,
//     draggable: false,
//     animation: google.maps.Animation.DROP
//   }));
//   iterator++;
// }

// getLocation();

// });

