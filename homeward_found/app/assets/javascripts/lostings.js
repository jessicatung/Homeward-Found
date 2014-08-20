
// === LOSTINGS ===================

function Lostings(){
  this.animalArray = [];
  this.lostingsMarkers = [];
  // this.lostingsInfo = [];
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
  },
  getLostingInfo: function(){
    var content = []
    for(var i = 0; i < this.animalArray.length; i++){
      var url = "/lostings/" + this.animalArray[i].id
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
  }
}
