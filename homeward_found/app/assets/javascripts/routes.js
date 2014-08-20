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

    var riverView = new RiverView ();
    var riverController = new RiverController ( riverView );
    riverController.setLostingsDataListener();
    $("#event-container").html(data)

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
    }).done(function(){
      $(document).trigger('reloadLostings')
    })
  },
  createSighting: function(e){
    e.preventDefault()
    e.stopPropagation()
    $.ajax({
      method: "post",
      url: "/sightings",
      data: $("#new_sighting").serialize()
    }).done(function(){
      $(document).trigger('reloadSightings')
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
    $("#lost_side").on("click", this.model.lostingRiver);
    $("#sight_side").on("click", this.model.sightingRiver);
  }
}
