<?php
	include_once('config.php');
	$input1=$_POST['bloodRequest_select1'];
	$input2=$_POST['bloodRequest_select2'];
	$input3=$_POST['Location'];
	$input4=$_POST['Location2'];
	
	$sql="INSERT INTO request(user_id,blood_group,blood_type,latitude,longitude) VALUES('donor1','$input1','$input2','$input3','$input4')";
	if($conn->query($sql)===TRUE){
		echo 'Your request perfectly send';
	}
	else{
		echo'Sending Fail';
	}
	?>