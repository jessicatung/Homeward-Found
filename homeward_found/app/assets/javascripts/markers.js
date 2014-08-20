
function Marker(lostings, sightings){
  this.lostings = lostings;
  this.sightings = sightings;
  this.iterator = 0;
  this.markers = this.lostings.lostingsMarkers.concat(this.sightings.sightingsMarkers)
}

Marker.prototype = {
  initializeMarkers: function(map){
    this.addInitialLostingMarkers(map);
    $("#my_map").on("click", this.checkMap(map))
    $("nav").on("click", this.checkMarkers(map))
  },
  addInitialLostingMarkers: function(map){
    var self = this;
    var iterator = this.lostings.iterator;
    var lostingsArray = this.lostings.animalArray;
    var infoWindow = new google.maps.InfoWindow()
    if(self.lostings.lostingsInfo.length < self.lostings.animalArray.length){
      self.lostings.lostingsInfo.push(self.lostings.getLostingInfo()[iterator].responseText)
      self.markers.push(self.addMarker(lostingsArray[iterator], map))
      self.lostings.lostingsMarkers.push(self.addMarker(lostingsArray[iterator], map))
    for (var i = 0; i < lostingsArray.length; i++) {
      google.maps.event.addListener(self.addMarker(lostingsArray[iterator], map), 'click', this.addInfoWindow(self.addMarker(lostingsArray[iterator]), self.lostings.lostingsInfo[iterator], infoWindow, map))

      iterator++
    }
    }
  },
  addInfoWindow: function(marker, content, infoWindow, map){
    return function(){
      infoWindow.setContent(content)
      infoWindow.open(map, marker)
    }
  },
  addMarker: function(type, map){
    var self = this;
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(type.Lat), parseFloat(type.Lng)),
        map: map,
        draggable: false,
        icon: self.animalType(type.animal_type)
      })
    // self.markers.push(marker)
    return marker
  },
  addInitialSightingMarkers: function(map){
    var self = this;
    var iterator = this.sightings.iterator;
    var sightingsArray = this.sightings.animalArray;
    var infoWindow = new google.maps.InfoWindow()
    if(self.sightings.sightingsInfo.length < self.sightings.animalArray.length){
      self.sightings.sightingsInfo.push(self.sightings.getSightingInfo()[iterator].responseText)
      self.sightings.sightingsMarkers.push(self.addMarker(sightingsArray[iterator], map))
    for (var i = 0; i < sightingsArray.length; i++) {
      google.maps.event.addListener(self.addMarker(sightingsArray[iterator], map), 'click', this.addInfoWindow(self.addMarker(sightingsArray[iterator]), self.sightings.sightingsInfo[iterator], infoWindow, map))
      iterator++
    }
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

      this.deleteMarkers()
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

  clearMarkers: function(markerType){
    for (var i = 0; i < markerType.length; i++) {
      markerType[i].setVisible(false);
    }

  },
  showMarkers: function(map){
    this.setAllMap(map);
  },
  deleteMarkers: function(){
    this.clearMarkers()
    this.sightings.sightingsMarkers = []
    this.lostings.lostingsMarkers = []
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
  },
  checkMarkers: function(map){
    var self = this;
    $("#sight_side").on("click", function(event){
      debugger
      self.removeTypeMarker(self.lostings.lostingsMarkers)
      self.addInitialSightingMarkers(map)
    })
    $("#lost_side").on("click", function(event){
      self.removeTypeMarker(self.markers);
      self.addInitialLostingMarkers(map);
    })
    $("#all_side").on("click", function(event){
      self.addInitialLostingMarkers(map)
      self.addInitialSightingMarkers(map)
    })
    $("#lost").on("click", function(event){
      self.removeTypeMarker(self.sightings.sightingsMarkers)
      self.removeTypeMarker(self.lostings.lostingsMarkers)
    })
    $("#sighting").on("click", function(event){
      self.removeTypeMarker(self.sightings.sightingsMarkers)
      self.removeTypeMarker(self.lostings.lostingsMarkers)
    })
  },
  removeTypeMarker: function(markerType){
    for (var i = 0; i < markerType.length; i++) {
      markerType[i].setMap(null);
      markerType[i].setVisible(false)
    }

  }
}