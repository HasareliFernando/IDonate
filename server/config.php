<?php
	define('BASE_PATH','https://idonate.000webhostapp.com/server');
	define('DB_HOST','localhost');
	define('DB_NAME','id2254260_idonate');
	define('DB_USERNAME','id2254260_root');
	define('DB_PASSWORD', '199313');
	$conn = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
	if(mysqli_connect_error()){
		echo('Failed to connect'.mysqli_connect_error());
		exit();
	}
	?>