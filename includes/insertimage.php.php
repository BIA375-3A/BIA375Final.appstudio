<?php


require_once("MDB2.php");
/*requires a MySQL db table with:
	 * - table name: picTest
	 *    -Fields:
	 *       pic, type=mediumtext  (This is the one that will hold the base64)
	 *       DATECREATED, type=date
	 *       filename, varchar(200)
	 *       deviceinfo, mediumtext or varchar(200) will probably do
	 * 
	 * This PHP script uses PEAR's MDB2 database object.
	 */ 


$dsn = array(

			'phptype' => 'mysql',
			'username' => 'dbusername',
			'password' => 'dbpassword',
			'hostspec' => 'blahblah.db.xxxx.host.com',
			'database' => 'PicsDB',
		);
			$options = array(
				'debug' =>2,
				'result_buffering' => false,
				);

$strRet = '';
$conn = MDB2::connect($dsn, $options); //instantiates driver and establishes immediate db connection


if(PEAR::isError($conn)) {
    die("Error while connecting : " . $conn->getMessage());
}else{
	$strRet .= '<b>Connection Made Successfully!</b><br/>';
	date_default_timezone_set('America/Chicago');
	$dc = date('Y-m-d h:i:s');
	$filecontents=file_get_contents('php://input');
	
	//Filename -FIRST 
	$ptr1 = strpos($filecontents,'filename=') + strlen('filename=');
	$ptr2 = strpos($filecontents,'&');
	$len = $ptr2-$ptr1;
	$filename = substr($filecontents,$ptr1,$len);
	
	//Device Information (Use this code for subsequent variable/value POSTS)
	$ptr1 = strpos($filecontents,'&deviceInfo=') + strlen('&deviceInfo=');
	$ptr2 = strpos($filecontents,'&',$ptr1+1);
	$len = $ptr2-$ptr1;
	$deviceInfo = substr($filecontents,$ptr1,$len);
	
	//read post data from filecontents --PIC Must ALWAYS be the LAST substr
	$ptr1 = strpos($filecontents,'&imgBase64=') + strlen('&imgBase64=');
	$pic = substr($filecontents,($ptr1));
	
	//insert image text to photo table

	$sql = "INSERT INTO picTest (pic, DATECREATED, filename, deviceinfo) VALUES ('$pic', '$dc', '$filename','$deviceInfo')";
	$result =& $conn->exec($sql);
	if(PEAR::isError($result)){
		die('Error: ' . $result->getMessage());
	}
	else {
		$strRet .= 'Your pic was inserted at: ' . $dc . '<br/>';
	
	}

	
	echo $strRet; //returned to the htmResponse control

	$conn->disconnect();


}







?>