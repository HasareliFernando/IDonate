<?php
	include_once('config.php');
	$input1=$_POST['addAsDonor2_input35'];
	$input2=$_POST['addAsDonor2_input36'];
	$input3=$_POST['Nic'];
	$sqli="UPDATE donor SET lastDon='$input1' , DonorNum='$input2' WHERE nic = '$input3'" ;
	
	if($conn->query($sqli)===TRUE){
		echo 'Done';
	}
	else{
		echo'Error';
	}
	?>