$( document ).ready(function () {
  var riverView       = new RiverView ();
  var riverController = new RiverController ( riverView );
  riverController.start();
})

// === River Controller ===================================
function RiverController ( view ) {
  this.view = view;
}

RiverController.prototype = {
  start: function () {
    var request = $.ajax({
      url: "/lostings/recent",
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
