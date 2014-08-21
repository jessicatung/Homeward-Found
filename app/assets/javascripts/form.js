function FormController(){}

FormController.prototype = {
  initialize: function(){
    this.changeCheck()
  },

  animalCheck: function(event, type){
    var lostingAnimalType = $("#losting_animal_type").val()
    var sightingAnimalType = $("#sighting_animal_type").val()
    if(lostingAnimalType === "cat" || sightingAnimalType === "cat"){
      $("#dog").empty();
      $("#cat").css("display", "block");
    } else if (lostingAnimalType === "dog" || sightingAnimalType === "dog"){
      $("#cat").empty();
      $("#dog").css("display", "block");
    }
      $(".info").css("display", "block")

  },
  changeCheck: function(){
    $("#event-container").on("change", "#losting_animal_type", this.animalCheck)
    $("#event-container").on("change", "#sighting_animal_type", this.animalCheck)
  }

}

// function FormView(){}
// FormView.prototype = {
//   catForm: function(){
//     $("#dog").css("display", "none");
//     $("#cat").css("display", "block");
//   },
//   dogForm: function(){
//     $("#cat").css("display", "none");
//     $("#dog").css("display", "block");
//   },
//   infoForm: function(){
//     (".info").css("display", "block");
//   }
// }