<?php
	include_once('config.php');
	$user=$_POST['user'];
	$input1=$_POST['addAsDonorInput31'];
	$input2=$_POST['addAsDonor_select2'];
	$input3=$_POST['addAsDonor_select3'];
	$input4=$_POST['Location'];
	$input5=$_POST['Location2'];
	$sql ="SELECT telephone FROM general_user WHERE user_id='$user' ";
	$query=$conn->query($sql);
	if($query->num_rows >0){
		while($row=$query->fetch_array()){
			$tele=$row['telephone'];
		}
	}
	
	$sql="INSERT INTO donor VALUES('$user','$tele','$input1','$input2','$input3','$input4','$input5',null,null,1,10)";
	if($conn->query($sql)===TRUE){
		echo 'Next';
	}
	else{
		echo'you already done';
	}
	?>