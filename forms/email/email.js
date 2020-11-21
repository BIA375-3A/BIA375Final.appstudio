 //Send a picture to your teacher

 rotation = 0;

 btnMail.onclick = function() {
     location = "mailto:" + encodeURI("cindycc@gmail.com") + "?subject=" + encodeURI("Question") + "&body=" + "<img src='" + PictureBox1.toDataURL() + "'/>";
 };

 btnRotate.onclick = function() {
     var pb;
     rotation = (rotation + 90) % 360;
     if ((rotation % 180) != 0) { //portrait
         PictureBox1.resize(48, 100, 225, 300);
     } else { //landscape
         PictureBox1.resize(10, 128, 300, 225);
     }

     pb = PictureBox1.getContext("2d");
     pb.save();
     pb.translate(PictureBox1.width / 2, PictureBox1.height / 2);
     pb.rotate(rotation * Math.PI / 180);
     imgObj = PictureBox1.img;
     NSB.drawImageIOSFix(pb, imgObj, 0, 0, 0, 0, -150, -112, 300, 225);
     pb.restore();
 };