
function Marker(lostings, sightings){
  this.lostings = lostings;
  this.sightings = sightings;
  this.iterator = 0;
  this.windowiterator = 0;
  this.lostingsMarkers = []
  this.sightingsMarkers = []
  this.lostingsInfo = []
  this.markers = this.lostingsMarkers.concat(this.sightingsMarkers)
}

Marker.prototype = {
  initializeMarkers: function(map){
    this.addInitialLostingMarkers(map);
    $("#my_map").on("click", this.checkMap(map))
    $("nav").on("click", this.checkMarkers(map))
  },
  getInfo: function(){
    var content = []
    for(var i = 0; i < this.lostings.animalArray.length; i++){
      var url = "/lostings/" + this.lostings.animalArray[i].id
      iter = i
      content.push($.ajax({
        method: "get",
        async: false,
        url: url
      }).done(function(data){
        this.lostingsInfo[iter] = data
      }.bind(this)))
    }
    return content
  },
  addInitialLostingMarkers: function(map){
    var self = this;
    var iterator = this.lostings.iterator;
    var lostingsArray = this.lostings.animalArray;
// var lostingsInfo = []
      // self.lostingsInfo[iterator] = new google.maps.InfoWindow()
    var infoWindow = new google.maps.InfoWindow()
    for (var i = 0; i < lostingsArray.length; i++) {
      this.lostingsInfo.push(this.getInfo()[i].responseText)
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(lostingsArray[iterator].Lat), parseFloat(lostingsArray[iterator].Lng)),
        map: map,
        draggable: false,
        icon: self.animalType(lostingsArray[iterator].animal_type)
        })

      google.maps.event.addListener(marker, 'click', function(marker, content, infoWindow) {
        return function(){
        infoWindow.setContent(content)
        infoWindow.open(map, marker)
        }
      }(marker, self.lostingsInfo[iterator], infoWindow));
    iterator++
    }
  },
  placeInfoWindow: function(map){
    var self = this;
    var iterator = this.lostings.iterator;
    var lostingsArray = this.lostings.animalArray;
    for (var i = 0; i < lostingsArray.length; i++) {
      var url = "/lostings/" + lostingsArray[iterator].id
      $.ajax({
        method: "get",
        url: url
      }).done(function(data){
        var infowindow = new google.maps.InfoWindow({
          content: data,
          position: new google.maps.LatLng(parseFloat(self.lostings.animalArray[self.lostings.iterator].Lat), parseFloat(self.lostings.animalArray[self.lostings.iterator].Lng))
        })
        self.lostingsInfo.push(infowindow)
        $.each(self.lostingsMarkers, function(val, i){
          var value = val
          google.maps.event.addListener(i, 'click', function() {
            debugger
            self.lostingsInfo[self.windowiterator].open(map, i)
            // infowindow.open(map,i);
          });
        })
      })
      self.windowiterator++
      iterator++;
    }
  },
  addInitialSightingMarkers: function(map){
    var self = this;
    var iterator = this.sightings.iterator;
    var sightingsArray = this.sightings.animalArray
    // this.clearMarkers()
    for (var i = 0; i < sightingsArray.length; i++) {

      setTimeout(function() {
        self.sightingsMarkers.push(new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(sightingsArray[iterator].Lat), parseFloat(sightingsArray[iterator].Lng)),
          map: map,
          draggable: false,
          icon: self.animalType(sightingsArray[iterator].animal_type)
          // animation: google.maps.Animation.DROP
        }));
        iterator++;
    }); //* (100 * i)
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

  clearMarkers: function(){
    this.setAllMap(null)
  },
  showMarkers: function(map){
    this.setAllMap(map);
  },
  deleteMarkers: function(){
    this.clearMarkers()
    this.sightingsMarkers = []
    this.lostingsMarkers = []
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
    // $("#sight_side").on("click", this.addInitialSightingMarkers(map, this.sightings))
    google.maps.event.addListener(map, 'click', function(event) {
      self.placeMarker(event.latLng, map);
    });
  },
  checkMarkers: function(map){
    var self = this;
    $("#sight_side").on("click", function(event){
      self.removeTypeMarker(self.lostingsMarkers)
      self.addInitialSightingMarkers(map)
    })
    $("#lost_side").on("click", function(event){
      self.removeTypeMarker(self.sightingsMarkers)
      self.addInitialLostingMarkers(map)
    })
    $("#all_side").on("click", function(event){
      self.addInitialLostingMarkers(map)
      self.addInitialSightingMarkers(map)
    })
    $("#lost").on("click", function(event){
      self.removeTypeMarker(self.sightingsMarkers)
      self.removeTypeMarker(self.lostingsMarkers)
    })
    $("#sighting").on("click", function(event){
      self.removeTypeMarker(self.sightingsMarkers)
      self.removeTypeMarker(self.lostingsMarkers)
    })
  },
  removeTypeMarker: function(markerType){
    for (var i = 0; i < markerType.length; i++) {
      markerType[i].setMap(null);
    }
  }
}