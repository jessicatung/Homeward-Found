// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(document).ready(function() {

  LOC = ""

  var sanFran = new google.maps.LatLng(37.7749290,-122.4194160);

  var lostings = [
  new google.maps.LatLng(37.7846330,-122.3974140),
  new google.maps.LatLng(37.7959230,-122.3920520),
  new google.maps.LatLng(37.7698250,-122.4667820),
  ];

  var markers = [];
  var iterator = 0;

  var map;

//------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(makeMap);
  } else {
    console.log( "Geolocation is not supported by this browser.");
  }
}

getLocation()

function makeMap(position) {
  LOC = position
  console.log(LOC.coords.latitude)
  console.log(LOC.coords.longitude)
}


function initialize() {
  var mapOptions = {
    zoom: 13,
    center: sanFran
  };

  map = new google.maps.Map(document.getElementById('my_map'),
    mapOptions);

  drop();

  var allowedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(37.717462, -122.541557),
    new google.maps.LatLng(37.817099, -122.378865)
    );

  var lastValidCenter = map.getCenter();

  google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {
      lastValidCenter = map.getCenter();
      return;
    }
    map.panTo(lastValidCenter);
  });
}

// -----

function drop() {
  for (var i = 0; i < lostings.length; i++) {
    setTimeout(function() {
      addMarker();
    }, i * (200 * i));
  }
}

function addMarker() {
  markers.push(new google.maps.Marker({
    position: lostings[iterator],
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  }));
  iterator++;
}

google.maps.event.addDomListener(window, 'load', initialize);

});

