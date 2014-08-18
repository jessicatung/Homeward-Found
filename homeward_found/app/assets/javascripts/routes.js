function RouteModel(){}
RouteModel.prototype = {
  lostingForm: function(e){
    e.preventDefault()
    $.ajax({
      method: "get",
      url: "/lostings/new"
    }).done(function(data){
    $("#event-container").html(data)
  })
  },
  sightingForm: function(e){
    e.preventDefault()
    $.ajax({
     method: "get",
     url: "/sightings/new"
   }).done(function(data){
    $("#event-container").html(data)
  })
 },
 homePage: function(e){
  e.preventDefault()
  $.ajax({
   method: "get",
   url: "/lostings"
 }).done(function(data){
  $("#event-container").html(data)
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
    $("#home").on("click", this.model.homePage);
    $("lost_side").on("click", this.model.homePage)
  }
}
