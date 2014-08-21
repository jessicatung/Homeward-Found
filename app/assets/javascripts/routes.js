function RouteModel(){}

RouteModel.prototype = {
  lostingForm: function(e){
    e.stopPropagation()
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
  var riverView = new RiverView ();
  var riverController = new RiverController ( riverView );
  riverController.startLostings();
  $("#event-container").html(data)
})
},
sightingRiver: function(e){
  e.stopPropagation()
  $.ajax({
   method: "get",
   url: "/sightings"
 }).done(function(data){
  var riverView = new RiverView ();
  var riverController = new RiverController ( riverView );
  riverController.startSightings();
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
  }).done(function(data){
    $("#event-container").html("<h2>Relevant Sightings For Your Lost Pet </h2>");

    for(i=0; i < data.length; i++){
  $("#event-container").append((i+1) + ".  " + data[i]["coat_color"] + " " + data[i]["breed"] + " " + data[i]["animal_type"] + "<br> Tag:" + data[i]["tag"] + "<br>Detail: " + data[i]["detail"] + "<br> Last Seen: " + data[i]["long_date"] + "<hr>") }
  })
},
createSighting: function(e){
  e.preventDefault()
  e.stopPropagation()
  $.ajax({
    method: "post",
    url: "/sightings",
    data: $("#new_sighting").serialize()
  }).done(function(data){
    $("#event-container").html("<h2>Relevant Lost Pets For Your Sighting </h2>");

    for(i=0; i < data.length; i++){
  $("#event-container").append((i+1) + ".  " + data[i]["coat_color"] + " " + data[i]["breed"] + " " + data[i]["animal_type"] + "<br> Tag:" + data[i]["tag"] + "<br>Detail: " + data[i]["detail"] + "<br> Last Seen: " + data[i]["long_date"] + "<hr>") }
  })
}
}

function RouteController(model, map){
  this.map = map;
  this.model = model;
}

RouteController.prototype = {
  initialize: function(){
    this.bindListeners()
  },
  bindListeners: function(){
    $("#sighting").on("click", this.model.sightingForm);
    $("#lost").on("click", this.model.lostingForm);
    $(document).on('reloadLostings', this.model.lostingRiver);
    $(document).on('reloadSightings', this.model.sightingRiver);
    $("#home").on("click", this.model.lostingRiver);
  }
}