 //Contributed by Mike Miller jdmdude2009@gmail.com

 //This sample lets you get a picture from the camera or the Photo Library
 //and display it on your screen and:
 //    - Push it to a web server in base64 or PNG format using an AJAX POST
 //    - Receive a response from the server and do something with it.
 //This is a mod of the original Camera Sample file.
 //  You must have the supplied PHP files in the same location
 //  as the AppStudio production files.
 //
 //To control when a pic may be sent or that a pic is not sent
 //multiple times by click happy users, btnSubmitImages is placed
 //in different states of visiblility and/or usability by way of the 
 //SentFlag.

 //Note: PictureBox1 is in the negative left of the form.
 //      This is a trick that developers use to hide controls
 //      from the users but still have availability to them.
 //
 //      Image1 is used for preview ONLY because viewing PictureBox1
 //      isn't very realistic for viewing because it exceeds the 
 //      mobile screen size.  (You can size the PictureBox to any size
 //      a camera is capable of, but beware, size does matter!  The lag
 //      to insert an image into a db gets longer as the pics get larger.
 //      I also noticed phpmyadmin is not very responsive to large images AND
 //      I have had timeouts when loading pages with lots of images.  I suspect
 //      some sort of slide presentation tool that controls the load of
 //      the images will be in order to view large quantities of photos
 //      (lot's of opensource for slide views)
let query6 = ''

var SentFlag;

reader = new FileReader();
SentFlag=0;

function Main() {
  pb=PictureBox1.getContext("2d");
  btnSubmitImage.value="";
}

txtGetPicture.onchange = function() {
 //This gets called after the picture is chosen. 
 //Next, let's read start reading it in.
 //The _onload function will be called when that completes.
  reader.readAsDataURL(txtGetPicture.files[0]);
};

reader.onload = function(e) {
 //read of the file is complete.
 //Now, let's load it into an image.
 //The _onload function for the image will be called on completion.
  Image1.firstChild.src=e.target.result; //Phone Viewing ONLY
  pb.addImage(e.target.result,0,0,0,0,0,0,PictureBox1.width,PictureBox1.height);
  SentFlag=0;
  btnSubmitImage.hidden=false;
  btnSubmitImage.value="Send Image to Web";
  lblPicMsg.textContent="Now is the time";

};

function PostToWebServer() {
 var devInfo;
 var postData;

  SentFlag=1; //Don't allow multiple submissions because the button
 //is pushed more than once.

 //Get divice information - not available 
  devInfo="No device selected";

 //Build POST  
  postData = "filename="  +  txtGetPicture.files[0].name;
  postData = postData  +  "&deviceInfo="  +  devInfo;
  postData = postData  +  "&imgBase64="  +  PictureBox1.toDataURL();

  console.log(PictureBox1.toDataURL())
  console.log(postData)
 //Send POST to server
  req=Ajax("insertimage.php" ,"POST" ,postData);

  if(req.status==200) { //success
    btnSubmitImage.hidden=true; //Picture was pushed to server so hide button
    lblPicMsg.textContent =  "Success!!!";
    htmResponse.innerHTML=req.responseText;
 } else { //failure
    htmResponse.innerHTML="Error: "  +  req.err;
    btnSubmitImage.hidden=false;
    lblPicMsg.textContent =  "Failure";
    SentFlag=0;
  }

}



btnSubmitImage.onclick = function() {
  if(Len(PictureBox1.toDataURL())>0 && SentFlag==0) {
      btnSubmitImage.value = "Sending";
      lblPicMsg.textContent = "Please Wait";

 //Use the SetTimout function to call a procedure OUTSIDE
 //this onclick event so that any events that need to 
 //occur on submission are not held up by the size of the
 //image or the speed of the internet connection.
 //(i.e. the btn value change and the label caption change.  
    setTimeout(PostToWebServer,3000); //POST TO WEB

 } else {
      lblPicMsg.textContent =  "Need to take a pic first";
  }
};

req = ''
results = ''
Button2.onclick=function(){
  //Insert picture into the Database
  //INSERT INTO attendance (class) VALUES (drpClass.value);
  query6 = `INSERT INTO attendance (document) VALUES ("${txtGetPicture.files[0].name}")`
  console.log(query6)
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ymb85951&pass=" + pw + "&database=375groupa3&query=" + query6)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    if (req.responseText == 500) {
      console.log("It worked to insert class")
      lblMessagePic.value = "Your picture has been saved, You can close the app now"
    } else
      lblMessagePic.value = "There was an error when adding the class."
  } else {
    lblMessagePic.value = "There was an error connecting ot ormonds server for adding class."
  }
  
}
