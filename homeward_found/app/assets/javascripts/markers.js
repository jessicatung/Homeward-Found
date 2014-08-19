
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
    $("a").on("click", this.adjustMap)
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
  addNewMarker: function(marker){
    var newMarkerCoordinate = new google.maps.LatLng(marker.position.k, marker.position.B);
    var lostings = this.lostings.animalArray
    lostings.push(newMarkerCoordinate);
    this.markers.push(marker)
  },

  placeMarker: function(location, map){
    if($(".info").css("display") === "block"){
      var formType = $("form").parent().attr("id")
      $("#" + formType + "_Lat").val(location.k)
      $("#" + formType + "_Lng").val(location.B)

        this.clearMarkers()
        this.markers = []
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          icon: this.animalType($("#" + formType + "_animal_type").val())
        });
        this.addNewMarker(marker)
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
      self.placeMarker(event.latLng, map);
    });
  }
}