// some whitespace might help my old eyes..and your young ones.
function RouteModel(){}
RouteModel.prototype = {
  lostingForm: function(e){
    e.stopImmediatePropagation()
    $.ajax({
      method: "get",
      url: "/lostings/new"
    }).done(function(data){
      $("#event-container").html(data)
    })
  },
  sightingForm: function(e){
    e.stopImmediatePropagation()
    $.ajax({
     method: "get",
     url: "/sightings/new"
   }).done(function(data){
    $("#event-container").html(data)
  })
 },
 lostingRiver: function(e){
  e.stopImmediatePropagation()
  $.ajax({
   method: "get",
   url: "/lostings"
 }).done(function(data){
  $("#event-container").html(data)
  // $("#sight_side").css("background-color", "#d3d3d3");
  // $("#all_side").css("background-color", "#d3d3d3");
  // $("#lost_side").css("background-color", "white");
})
},
sightingRiver: function(e){
  e.stopImmediatePropagation()
  $.ajax({
   method: "get",
   url: "/sightings"
 }).done(function(data){
  $("#event-container").html(data)
  // $("#sight_side").css("background-color", "white");
  // $("#lost_side").css("background-color", "#d3d3d3");
  // $("#all_side").css("background-color", "#d3d3d3");
})
}
}

function RouteController(model){
  this.model = model;
}

RouteController.prototype = {
  initialize: function(){
    this.bindListeners()
  },
  bindListeners: function(){
    $("#sighting").on("click", this.model.sightingForm);
    $("#lost").on("click", this.model.lostingForm);
    $("#home").on("click", this.model.lostingRiver);
    $("#lost_side").on("click", this.model.lostingRiver);
    $("#sight_side").on("click", this.model.sightingRiver);
  }
}


