function RouteModel(){}
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
  e.stopPropagation()
  $.ajax({
   method: "get",
   url: "/lostings"
 }).done(function(data){
  $("#event-container").html(data)
})
},
sightingRiver: function(e){
  e.stopPropagation()
  $.ajax({
   method: "get",
   url: "/sightings"
 }).done(function(data){
  $("#event-container").html(data)
})
},
createLosting: function(e){
  e.stopPropagation()
  $.ajax({
    method: "post",
    url: "/lostings"
  }).done(function(data){
  })
},
createSighting: function(e){
  e.stopPropagation()
  $.ajax({
    method: "post",
    url: "/lostings"
  }).done(function(data){
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


