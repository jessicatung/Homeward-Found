
function Marker(lostings, sightings){
  this.lostings = lostings;
  this.sightings = sightings;
  this.iterator = 0;
  this.markers = []
}

Marker.prototype = {
  initializeMarkers: function(map){
    var self = this;
    this.addInitialMarkers(map, this.lostings);
    google.maps.event.addListener(map, 'click', function(event) {
      self.placeMarker(event.latLng, map);
    });
    // this.sightings.addInitialSightingMarkers(map);
  },
  addInitialMarkers: function(map, markerType){
    var self = this;
    for (var i = 0; i < markerType.animalArray.length; i++) {

      setTimeout(function() {
        self.markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(markerType.animalArray[self.iterator].Lat), parseFloat(markerType.animalArray[self.iterator].Lng)),
          map: map,
          draggable: false,
          icon: self.animalType(markerType.animalArray[self.iterator].animal_type),
          // animation: google.maps.Animation.DROP
        }));
        self.iterator++;
    }, i ); //* (100 * i)
    }
  },
  addNewMarker: function(lat, lon){
    var newMarkerCoordinate = new google.maps.LatLng(lat, lon)
      this.lostings.animalArray.push(newMarkerCoordinate);
      this.markers.push(new google.maps.Marker({
        position: this.lostings.last,
        map: this.map,
        draggable: false,
        icon: this.animalType(this.lostings.last.animal_type),
        animation: google.maps.Animation.DROP
      }));
  },

  placeMarker: function(location, map){
    var formType = $("form").parent().attr("id")
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true,
      icon: this.animalType($("#" + formType + "_animal_type"))
    });
    $("#" + formType + "_Lat").val(location.k)
    $("#" + formType + "_Lng").val(location.B)

    this.addNewMarker(marker.position.k, marker.position.B)
  },
  animalType: function(animal_type){
    if (animal_type === "dog") {
      return "http://i.imgur.com/YUi5Qgh.png"
    } else {
      return "http://i.imgur.com/gLzkSIG.png"
    }
  }
}