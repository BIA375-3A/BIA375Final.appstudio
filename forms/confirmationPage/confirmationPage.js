confirmationPage.onshow = function() {
lblWelcome2.value = `Welcome ${firstName} ${lastName}`
}

btnLogOut.onclick=function(){
   ChangeForm(Login)
}

btnViewStats.onclick=function(){
  ChangeForm(email)
}

