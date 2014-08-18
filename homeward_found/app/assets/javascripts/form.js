function FormController(){}

FormController.prototype = {
  initialize: function(){
    this.changeCheck()
  },

  animalCheck: function(event, type){
    var lostingAnimalType = $("#losting_animal_type").val()
    var sightingAnimalType = $("#sighting_animal_type").val()
    if(lostingAnimalType === "cat" || sightingAnimalType === "cat"){
      $("#dog").css("display", "none");
      $("#cat").css("display", "block");
    } else if (lostingAnimalType === "dog" || sightingAnimalType === "dog"){
      $("#cat").css("display", "none");
      $("#dog").css("display", "block");
    }
      $(".info").css("display", "block")

  },
  changeCheck: function(){
    $("#losting_animal_type").on("change", this.animalCheck)
    $("#sighting_animal_type").on("change", this.animalCheck)
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