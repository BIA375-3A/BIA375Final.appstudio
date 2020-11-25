// global variables
req = ""
query = ""
let query2 = ""
let query3 = ""
let query4 = ""
let query5 = ""
results = ""
let allData = []
let cheadf = ''
let picBase64 = ""
let pic1 = ""
let userData = ''
let RATT = ''


//Select DRP
studentAttendance.onshow = function() {
  console.log(firstName)
  console.log(lastName)
  lblWelcome.value = ''
  lblWelcome.value = `Welcome ${firstName} ${lastName}`
  drpClass.clear()
  studentAttendance.width = "100%"
  studentAttendance.height = "100%"

  //Change query to populate classes into drp
  query = "SELECT * FROM classes"

  //Change parameters user/pw/database
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    allData = results
    if (results.length == 0)
      lblMessage.value = "There are no classes available."
    else {
      let message = ""
      for (i = 0; i <= results.length - 1; i++) {
        drpClass.addItem(results[i][1])
      }
    }
  } else
    lblMessage.value = "There was an error."
}


//Select class from drp
drpClass.onclick = function(s) {
  if (typeof(s) == "object") {
    return
  } else {
    drpClass.value = s
    lblMessage.value = s
    RATT = s
  }
}

function formatDate(date) {
  let d = date,
    month = d.substring(5, 7),
    day = d.substring(8, 10),
    year = d.substring(0, 4);
  return [month, day, year].join('/');
}
// this sets up a variable to read the picture file
let reader = new FileReader()

//read the picture
inptFile.onchange=function(){
     reader.readAsDataURL(inptFile.files[0])
}

reader.onload = function(e) {
     //this loads the read-in picture 
     //into the image control.
     //It also converts the picture into base64
     //for storage into the database
    //Image1.firstChild.src = e.target.result 
  picBase64 = e.target.result
  return
}

//On submit 
btnSubmit.onclick = function() {
  let newDate = formatDate(inpDate.value)
  console.log("new date variable" +newDate)
  console.log("inpdate.value variable" +inpDate.value)
  console.log(newDate)
  
  //Insert Date into Databae
  //INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
  query2 = `INSERT INTO attendance (date,class,attendance, document) VALUES ("${inpDate.value}","${drpClass.value}","${RATT}",'${picBase64}')`
  
  "INSERT INTO attendance (document) VALUES ('"+picBase64+"')"
  console.log(query2)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query2)
  console.log(req.responseText)
  
  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    console.log(req.responseText)
    if (req.responseText == 500) {
      console.log("It worked to insert all the data")
      ChangeForm(confirmationPage)
    } else {
      lblMessage.value = "There was an error when adding the date."
    }
  } else {
    lblMessage.value = "There was an error connecting to the database with ormond adding date."
  }
}

//Reset Page
btnReset.onclick = function() {
  inpDate.value = ""
  drpClass.value = ""
  rbtnAttendance.value = ""
  lblMessage.value = " "
  picBase64 = ''
}
