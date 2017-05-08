<?php
	inclued_once('config.php');
	$input31=$_POST['addAsDonor_input31'];
	$sql="INSERT INTO donor(donor_id)VALUES('$input31')";
	if($conn->query($sql)===TRUE){
		echo'Post Success';
	}
	else{
		echo'Fail';
	}
	?>