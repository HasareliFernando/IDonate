<?php
	include_once('config.php');
	$user=$_POST['user_id'];
	$phone='';

	$sql ="SELECT * FROM general_user WHERE user_id='$user' ";
	$query=$conn->query($sql);
	if($query->num_rows >0){
		while($row=$query->fetch_array()){
			$phone=$row['telephone'];
			

		}
		echo $phone;

	}else{
		echo 'error';
	}
	


	?>