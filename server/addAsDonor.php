<?php
	include_once('config.php');
	$input1=$_POST['addAsDonorInput31'];
	$input2=$_POST['addAsDonor_select2'];
	$input3=$_POST['addAsDonor_select3'];
	$input4=$_POST['Location'];
	$input5=$_POST['Location2'];
	
	$sql="INSERT INTO donor VALUES('donor44',25444,'$input1','$input2','$input3','$input4','$input5',null,null,1)";
	if($conn->query($sql)===TRUE){
		echo 'Next';
	}
	else{
		echo'you already done';
	}
	?>