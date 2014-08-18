// === River Controller ===================================
function RiverController ( view ) {
  this.view = view;
}

RiverController.prototype = {
  start: function () {
    var reponse = $.ajax({
      url: "/lostings/recent",
      type: "GET"
    }).done(this.view.render)
  },
  startSightings: function(){
    var reponse = $.ajax({
      url: "/sightings/recent",
      type: "GET"
    }).done(this.view.render)
  }
}

// === River View =========================================
function RiverView () {
}

RiverView.prototype = {
  render: function ( dataArray ) {
    $.each(dataArray,function(index, data) {
      var source = $( "#event-template" ).html();
      var template = Handlebars.compile( source )
      $( '#event-container' ).append(template(data))
    });
  }
}
