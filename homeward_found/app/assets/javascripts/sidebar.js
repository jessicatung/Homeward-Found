// === River Controller ===================================
function RiverController ( view ) {
  this.view = view;
}

RiverController.prototype = {
  startLostings: function () {
    var reponse = $.ajax({
      url: "/lostings/relevant_listings",
      type: "GET"
    }).done(this.view.render)
  },
  startSightings: function(){
    var reponse = $.ajax({
      url: "/sightings/relevant_listings",
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
