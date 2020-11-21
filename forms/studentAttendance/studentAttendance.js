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
//pw = "Hoffenheim1899!"


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
  }
}

function formatDate(date) {
  let d = date,
    month = d.substring(5, 7),
    day = d.substring(8, 10),
    year = d.substring(0, 4);
  return [month, day, year].join('/');
}

//On submit 
btnSubmit.onclick = function() {
  let newDate = formatDate(inpDate.value)
  console.log(inpDate.value)
  console.log(newDate)
  //Insert Date into Databae
  //INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
  query2 = `INSERT INTO attendance (date) VALUES (${newDate})`
  console.log(query2)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query2)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    if (req.responseText == 500) {
      console.log("It worked to insert date")
    } else {
      lblMessage.value = "There was an error when adding the date."
    }
  } else {
    lblMessage.value = "There was an error connecting to the database with ormond adding date."
  }


  //Insert Class into the Database
  //INSERT INTO attendance (class) VALUES (drpClass.value);
  query3 = `INSERT INTO attendance (class) VALUES ("${drpClass.value}")`
  console.log(query3)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query3)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    if (req.responseText == 500)
      console.log("It worked to insert class")
    else
      lblMessage.value = "There was an error when adding the class."
  } else {
    lblMessage.value = "There was an error connecting ot ormonds server for adding class."
  }


  //Insert In-Class Attendance into the Database
  console.log("Check to see if a string is under this line????????????????????????????")
  console.log(RATT)
  query4 = `INSERT INTO attendance (attendance) VALUES ("${RATT}")`
  console.log(query4)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query4)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    if (req.responseText == 500)
      console.log("It worked to insert attendance")
    else
      lblMessage.value = "There was an error when adding your attendance."
  } else {
    lblMessage.value = "There was an error connecting to ormonds server for adding in class attendance."
  }
  console.log(CmUpload.picturebox.toDataURL())
  /*
  //Insert document into the Database
  query5 = `INSERT INTO  () VALUES ()`
  console.log(query)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query5)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    if (req.responseText == 500)
      ChangeForm()
    else
      lblMessage.value = "There was an error when adding your document."
  } else {
    lblMessage.value = "There was an error."
  }
  */
}

//Reset Page
btnReset.onclick = function() {

  inpDate.value = ""
  drpClass.value = ""
  rbtnAttendance.value = ""
  CmUpload.value = ""
  lblMessage.value = " "

}


Button1.onclick=function(){
  ChangeForm(Picture)
}
