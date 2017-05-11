<?php
	include_once('config.php');
	$input1=$_POST['addAsDonorInput31'];
	$input2=$_POST['addAsDonor_select2'];
	$input3=$_POST['addAsDonor_select3'];
	
	$sql="INSERT INTO donor VALUES('donor2','$input1','$input2','$input3')";
	if($conn->query($sql)===TRUE){
		echo $input1;
	}
	else{
		echo'Fail';
	}
	?>