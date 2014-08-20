function RouteModel(view){
  this.view = view;
}
RouteModel.prototype = {
  lostingForm: function(e){
    e.stopPropagation()

    // login form interupt
    $("#logindiv").css("display", "block");

    $.ajax({
      method: "get",
      url: "/lostings/new"
    }).done(function(data){
      $("#event-container").html(data)
    })
  },
  sightingForm: function(e){
    e.stopPropagation()

    // login form interupt
    $("#logindiv").css("display", "block");

    $.ajax({
     method: "get",
     url: "/sightings/new"
   }).done(function(data){
    $("#event-container").html(data)
  })
 },
 lostingRiver: function(e){
  e.preventDefault()
  $.ajax({
   method: "get",
   url: "/lostings"
 }).done(function(data){
  $("#event-container").html(data)
})
},
sightingRiver: function(e){
  e.preventDefault()
  $.ajax({
   method: "get",
   url: "/sightings"
 }).done(function(data){
  $("#event-container").html(data)
})
},
createLosting: function(e){
  e.preventDefault()
  e.stopPropagation()
  $.ajax({
    method: "post",
    url: "/lostings",
    data: $("#new_losting").serialize()
  }).done($(document).trigger('reloadLostings'))
},
createSighting: function(e){
  e.stopPropagation()
  $.ajax({
    method: "post",
    url: "/sightings",
    data: $("#new_sighting").serialize()
  }).done($(document).trigger('reloadSightings'))
},
blah: function(){
  debugger
  this.model.lostingRiver
}
}

function RouteController(model, view){
  this.model = model;
  this.view = view;
}

RouteController.prototype = {
  initialize: function(){
    this.bindListeners()
    this.startLostings()
  },
  bindListeners: function(){
    $(document).on('reloadLostings',this.model.lostingRiver);
    $(document).on('reloadSightings',this.model.sightingRiver);
    $("#sighting").on("click", this.model.sightingForm);
    $("#lost").on("click", this.model.lostingForm);
    $("#aside_nav").on("click", "a", this.model.riverLoad)
    $("#lost_side").on("click", this.model.lostingRiver);
    $("#sight_side").on("click", this.model.sightingRiver);
  },
  startLostings: function () {
    var response = $.ajax({
      url: "/lostings/recent",
      method: "GET"
    }).done(this.view.render)
  },
  startSightings: function(){
    var response = $.ajax({
      url: "/sightings/recent",
      type: "GET"
    }).done(this.view.render)
  }
}

function RouteView(){}

RouteView.prototype = {
  render: function ( dataArray ) {
    $.each(dataArray,function(index, data) {
      var source = $( "#event-template" ).html();
      var template = Handlebars.compile( source )
      $( '#event-container' ).append(template(data))
    });
  }
}
