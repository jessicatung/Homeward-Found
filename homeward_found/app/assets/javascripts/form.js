function FormModel(){
  this.catBreeds = []
  this.dogBreeds = []
}

FormModel.prototype = {
  animalCheck: function(){
    var animalType = $("#losting_animal_type").val()

    if(animalType === "cat"){
      console.log(animalType)
      self.catSelect()
    } else if (animalType === "dog"){

    }
  },
  catSelect: function(){
    debugger
    if($("#losting_animal_type").val() === "cat"){

    $.ajax({
      method: "GET",
      url: "http://api.petfinder.com/breed.list?key=" + ENV['PET_FINDER_API_KEY'] + "&animal=cat&format=json"
    }).done(function(data){
      debugger
    })

    }
  },
  addBreeds: function(data){

  }
}


function FormController(model){
  this.model = model;
  }
FormController.prototype = {
  initialize: function(){
    // this.animalCheck()
    // this.animalCheck().bind(this.model)
    this.changeCheck()
  },

  animalCheck: function(event, type){
    var animalType = $("#losting_animal_type").val()
    if(animalType === "cat"){
      console.log(animalType)
      $("#cat").css("display", "block");
    } else if (animalType === "dog"){
      console.log(animalType)
      $("#dog").css("display", "block");
    }
  },
  changeCheck: function(){
  $("#losting_animal_type").on("change", this.animalCheck)
  }

}



// if ($("#losting_animal_type").val() === "cat"){
// console.log("cat")
// } else if ($("#losting_animal_type").val() == "dog"){

// }


// $("#losting_animal_type").on("CustomEvent", function(event){
//     var animalType = $("#losting_animal_type").val()
//     if(animalType === "cat"){
//       console.log(animalType)
//     debugger
//       return animalType
//     } else if (animalType === "dog"){
//       console.log(animalType)
//       return animalType
//     }
//     })

//     $("#losting_animal_type").click(function(){
//       console.log("hello")
//       $("#losting_animal_type").trigger("CustomEvent")
//     })