
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

    $("#my_map").on("click", this.checkMap(map))
    // this.sightings.addInitialSightingMarkers(map);
  },
  addInitialMarkers: function(map, markerType){
    var self = this;
    this.clearMarkers()
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
    this.iterator = 0;
    var newMarkerCoordinate = new google.maps.LatLng(lat, lon);
    var lostings = this.lostings.animalArray
    var formType = $("form").parent().attr("id")

    lostings.push(newMarkerCoordinate);
    this.markers.push(new google.maps.Marker({
      position: lostings[lostings.length - 1],
      map: this.map,
      draggable: false,
      icon: this.animalType($("#" + formType + "_animal_type").val()),
      animation: google.maps.Animation.DROP
    }));
  },

  placeMarker: function(location, map){
    this.iterator++
    var marker;
    var formType = $("form").parent().attr("id")
    $("#" + formType + "_Lat").val(location.k)
    $("#" + formType + "_Lng").val(location.B)
    if(this.iterator != 1){
      marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: this.animalType($("#" + formType + "_animal_type").val())
      });
      this.addNewMarker(marker.position.k, marker.position.B)
    } else if(this.iterator === 1){
      this.clearMarkers()
    }
  },
  setAllMap: function(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  },

  clearMarkers: function(){
    this.setAllMap(null)
  },
  showMarkers: function(map){
    this.setAllMap(map);
  },
  deleteMarkers: function(){
    this.clearMarkers()
    this.markers = []
  },
  animalType: function(animal_type){
    if (animal_type === "dog") {
      return "http://i.imgur.com/YUi5Qgh.png"
    } else if(animal_type === "cat"){
      return "http://i.imgur.com/gLzkSIG.png"
    }
  },

  checkMap: function(map){
    var self = this;
    google.maps.event.addListener(map, 'click', function(event) {
      // self.deleteMarkers()
      self.placeMarker(event.latLng, map);
    }.bind(window));
  }
}