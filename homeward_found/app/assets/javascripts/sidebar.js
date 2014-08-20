// === River Controller ===================================
function RiverController ( view ) {
  this.view = view;
  var self = this;
  $(document).on("relevantLostingsRefresh", self.view.render)
}

RiverController.prototype = {
  startLostings: function () {
    $.ajax({
      url: "/lostings/relevant_listings",
      type: "GET",
      data: { coords:
        { lat: currentCenter.k, lng: currentCenter.B }
      }
    }).done(this.view.render)
  },
  startSightings: function(){
    $.ajax({
      url: "/sightings/relevant_listings",
      type: "GET",
      data: { coords:
        { lat: currentCenter.k, lng: currentCenter.B }
      }
    }).done(this.view.render)
  }
}

// === River View =========================================
function RiverView () {
}

RiverView.prototype = {
  render: function ( e, dataArray ) {
    console.log(dataArray)
    $.each(dataArray,function(index, data) {
      var source = $( "#event-template" ).html();
      var template = Handlebars.compile( source )
      $( '#event-container' ).append(template(data))
    });
  }
}
