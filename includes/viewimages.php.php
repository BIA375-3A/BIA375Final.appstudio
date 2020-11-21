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

$conn = MDB2::connect($dsn, $options);

if(PEAR::isError($conn)) {
    die("Error while connecting : " . $conn->getMessage());
}else{
	echo '<html><head><title>Mobile Images</title></head><body>';
	echo 'Connection Made Successfully!<br/>';
	
	//FETCH
	$result =& $conn->query('SELECT * FROM picTest ORDER BY DATECREATED');

	//Get each row of data on each iteration until eof
	while($row = $result->fetchRow()){
		echo '<div>';
		echo '<img src="' . $row[0] . '"/><br/>';
		echo "Date: " . $row[1]  . "<br/>";
		echo "Filename: " . $row[2] . "<br/>";
		echo "Device Info: " . $row[3] . "<br/>";
		echo '</div>';
		echo '<hr/>';
		
	}
	$conn->disconnect();
	echo '</body></html>';
	//echo 'DISConnection Made Successfully!';
}
// use $conn

?>



