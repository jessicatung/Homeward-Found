function LoginModel(){}
LoginModel.prototype = {
  displayLoginForm: function(){
    $("#loginForm").css("display", "block");
    $("#login").css("display", "none");
    $("#signup").css("display", "none");
    $(".goBack").css("display", "block");
  },
  displaySignupForm: function(){
    $("#signupForm").css("display", "block");
    $("#login").css("display", "none");
    $("#signup").css("display", "none");
    $(".goBack").css("display", "block");
  },
  goBack: function(){
    $("#login").css("display", "block");
    $("#signup").css("display", "block");
    $(".goBack").css("display", "none");
    $("#loginForm").css("display", "none");
    $("#signupForm").css("display", "none");
  }
}

function LoginController(model){
  this.model = model;
}

LoginController.prototype = {
  initialize: function(){
    $("#login").on("click", this.model.displayLoginForm)
    $("#signup").on("click", this.model.displaySignupForm)
    $(".goBack").on("click", this.model.goBack)
  }
}