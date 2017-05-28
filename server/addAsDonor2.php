<?php
	include_once('config.php');
	$input1=$_POST['addAsDonor2_input35'];
	$input2=$_POST['addAsDonor2_input36'];
	$input3=$_POST['Nic'];
	if($input1==""&&$input2==""){
		echo 'Done';

	}elseif($input1!=""&&$input2==""){
		echo'Please Enter Donor Book Number';
	}elseif($input1==""&&$input2!=""){
		
		$sqli="UPDATE donor SET  DonorNum='$input2' WHERE nic = '$input3'" ;
	
		if($conn->query($sqli)===TRUE){

			echo 'Done';
			
		}
		else{
			echo 'Something went worng';
		}
	}
	else{
		$sqli="UPDATE donor SET lastDon='$input1' , DonorNum='$input2' WHERE nic = '$input3'" ;
	
	if($conn->query($sqli)===TRUE){

		echo 'Done';
		
	}
	else{
		echo 'Something went worng';
	}
	}
	
	?>