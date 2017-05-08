<?php
	define('BASE_PATH','http://127.0.0.1/IDonate/server');
	define('DB_HOST','127.0.0.1');
	define('DB_NAME','');
	define('DB_USERNAME','root');
	define('DB_PASSWORD', 'idonate');
	$conn = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
	if(mysql_connect_error()){
		echo('Failed to connect',mysqli_connect_error());
		exit();
	}
	?>