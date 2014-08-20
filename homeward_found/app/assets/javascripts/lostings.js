
// === LOSTINGS ===================

function Lostings(){
  this.animalArray = [];
  this.lostingsMarkers = [];
  this.iterator = 0;
}

Lostings.prototype = {
  getLostings: function(){
    $.ajax({
      method: "GET",
      url: "/lostings/recent"
    }).done(function(data){
      for(var i = 0; i < data.length; i++){
        this.animalArray.push(data[i])
      }
    }.bind(this))
  }
}
