function LoginController(view){
  this.view = view;
}

LoginController.prototype = {
  initialize: function(){
    $("#logindiv").on("click", "#login", this.view.displayLoginForm)
    $("#logindiv").on("click", "#signup", this.view.displaySignupForm)
    $("#logindiv").on("click", ".goBack", this.view.goBack)
  }
}

function LoginView(){}
LoginView.prototype = {
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

