

// === SIGHTINGS ===================


function Sightings(){
  this.animalArray = [];
  this.sightingsMarkers = [];
  this.iterator = 0;
}

Sightings.prototype = {
  getSightings: function(){
    $.ajax({
      method: "GET",
      url: "/sightings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.animalArray.push(data[i])
      }
    }.bind(this))
  }
}