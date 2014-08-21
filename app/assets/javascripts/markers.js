//  ---------------------------------------- MARKER CONTROLLER
function MarkersController(model, view){
  this.model = model;
  this.view = view;
}
MarkersController.prototype = {
  initializeMarkers: function(map){
    this.model.addInitialLostingMarkers(map);
    $("#my_map").on("click", this.checkMap(map))
    $("nav").on("click", this.checkMarkers(map))
  },
  checkMap: function(map){
    var self = this;
    google.maps.event.addListener(map, 'click', function(event) {
      self.model.placeMarker(event.latLng, map);
    });
  },
  checkMarkers: function(map){
    var self = this;
    var view = this.view;
    var model = this.model;
    var lostingsArray = model.lostings.lostingsMarkers
    var sightingsArray = model.sightings.sightingsMarkers
    $("#sight_side").on("click", function(){
      view.showSightingMarkersOnly(lostingsArray, map, model)
    })
    $("#lost_side").on("click", function(event){
      view.showLostingMarkersOnly(sightingsArray, map, model)
    })
    $("#all_side").on("click", function(event){
      view.showAllMarkers(map, model)
    })
    $("#lost").on("click", function(event){
      view.removeAllMarkers(model)
    })
    $("#sighting").on("click", function(event){
      view.removeAllMarkers(model)
    })
    $("#event-container").on("submit", "#new_sighting", function(event){
      self.view.showSightingMarkersOnly(lostingsArray, map, model)
    }.bind(self))
    $("#event-container").on("submit", "#new_losting", function(event){
      self.view.showLostingMarkersOnly(sightingsArray, map, model)
    }.bind(self))
  }
}

//  ---------------------------------------- MARKER MODEL


function Marker(lostings, sightings, view){
  this.lostings = lostings;
  this.sightings = sightings;
  this.view = view;
  this.iterator = 0;
  this.markers = this.lostings.lostingsMarkers.concat(this.sightings.sightingsMarkers)
}

Marker.prototype = {
  addInitialLostingMarkers: function(map){
    var self = this;
    var iterator = this.lostings.iterator;
    var lostingsArray = this.lostings.animalArray;
    var infoWindow = new google.maps.InfoWindow()
    for (var i = 0; i < lostingsArray.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(lostingsArray[iterator].Lat), parseFloat(lostingsArray[iterator].Lng)),
        map: map,
        draggable: false,
        icon: self.view.animalType(lostingsArray[iterator].animal_type)
      })
      self.lostings.lostingsMarkers.push(marker)
      google.maps.event.addListener(marker, 'click', self.addInfoWindow(marker, lostingsArray[iterator], infoWindow, map))

      iterator++
    }
  },
  addInitialSightingMarkers: function(map){
    var self = this;
    var iterator = this.sightings.iterator;
    var sightingsArray = this.sightings.animalArray;
    var infoWindow = new google.maps.InfoWindow()
    for (var i = 0; i < sightingsArray.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(sightingsArray[iterator].Lat), parseFloat(sightingsArray[iterator].Lng)),
        map: map,
        draggable: false,
        icon: self.view.animalType(sightingsArray[iterator].animal_type)
      })
      self.sightings.sightingsMarkers.push(marker)

      google.maps.event.addListener(marker, 'click', self.addInfoWindow(marker, sightingsArray[iterator], infoWindow, map))
      iterator++
    }
  },
  addInfoWindow: function(marker, animal, infoWindow, map){
    return function(){
      infoWindow.setContent("<strong>" + animal.pet_name + "</strong><br>" + animal.coat_color + " " + animal.breed +  " " + animal.animal_type + "<br>" + "Last Seen: " +  animal.long_date)
      infoWindow.open(map, marker)
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
        icon: this.view.animalType($("#" + formType + "_animal_type").val())
      });
      this.addNewMarker(marker)
    }
  },
  setAllMap: function(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  },
  // clearMarkers: function(markerType){
  //   for (var i = 0; i < markerType.length; i++) {
  //     markerType[i].setVisible(false);
  //   }
  // },
  clearMarkers: function(){
    this.setAllMap(null)
  },
  deleteMarkers: function(){
    this.clearMarkers()
    this.sightings.sightingsMarkers = []
    this.lostings.lostingsMarkers = []
  }
}


//  ---------------------------------------- MARKER VIEW


function MarkerView(){}
MarkerView.prototype = {
  showSightingMarkersOnly: function(markerToRemove, map, markers){
    this.removeTypeMarker(markerToRemove)
    markers.addInitialSightingMarkers(map)
  },
  showLostingMarkersOnly: function(markerToRemove, map, markers){
    this.removeTypeMarker(markerToRemove)
    markers.addInitialLostingMarkers(map)
  },
  showAllMarkers: function(map, markers){
    markers.addInitialLostingMarkers(map)
    markers.addInitialSightingMarkers(map)
  },
  removeAllMarkers: function(markers){
    var sightings = markers.sightings.sightingsMarkers
    var lostings = markers.lostings.lostingsMarkers
    this.removeTypeMarker(sightings)
    this.removeTypeMarker(lostings)
  },
  removeTypeMarker: function(markerType){
    for (var i = 0; i < markerType.length; i++) {
      markerType[i].setMap(null);
    }
  },
  showTypeMarker: function(markerType, map){
    for (var i = 0; i < markerType.length; i++) {
      markerType[i].setMap(map);
    }
  },
  animalType: function(animal_type){
    if (animal_type === "dog") {
      return "http://i.imgur.com/YUi5Qgh.png"
    } else if(animal_type === "cat"){
      return "http://i.imgur.com/gLzkSIG.png"
    }
  }
}