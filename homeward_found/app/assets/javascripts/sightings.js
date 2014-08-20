// === SIGHTINGS ===================


function Sightings(){
  this.animalArray = [];
  this.sightingsMarkers = [];
  this.sightingsInfo = [];
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
  },
  getSightingInfo: function(){
    var content = []
    for(var i = 0; i < this.animalArray.length; i++){
      var url = "/sightings/" + this.animalArray[i].id
      iter = i
      content.push($.ajax({
        method: "get",
        async: false,
        url: url
      }).done(function(data){
        this.sightingsInfo[iter] = data
      }.bind(this)))
    }
    return content
  }
}