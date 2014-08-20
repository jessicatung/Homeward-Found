// === River Controller ===================================
function RiverController ( view ) {
  this.view = view;
}

RiverController.prototype = {
  startLostings: function () {
    $.ajax({
      url: "/lostings/relevant_listings",
      type: "GET"
    }).done(this.view.render)
  },
  startSightings: function(){
    $.ajax({
      url: "/sightings/relevant_listings",
      type: "GET"
    }).done(this.view.render)
  },
  setLostingsDataListener: function () {
    debugger
    $(document).on("relevantLostingsRefresh", this.getLostingsData)
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
