// global variables for database calls
let req = ""
let query = ""
let results = ""
let pw = "Berhanu#0721"
let firstName = ''
let lastName = ''

// check to see if they can login in
BtnSubmit.onclick=function(){
  //vcreate variable to hold username and passowrd
  let userName = InpUsername.value
  let password = InpPassword.value
  //clear message header
  Messagek.value = ''
  //our query 
  query = `SELECT first_name, last_name from user WHERE username = "${userName}" AND password = "${password}"`
  console.log(query)
  //connect to server
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query)
  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
    console.log(results)
    //get first and last name
    firstName = results[0][0]
    lastName = results[0][1]
  } 
  if (results.length == 0) {
    // if no customers in a table brings back this message
    Messagek.value = "There are no customers found."
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    ChangeForm(studentAttendance)
  }
  InpUsername.value = ''
  InpPassword.value = ''  
}

BtnClear.onclick=function(){
  InpUsername.value = ''
  InpPassword.value = ''
  Messagek.value = ''  
}

Button1Copy.onclick=function(){
  ChangeForm(studentAttendance)
}
