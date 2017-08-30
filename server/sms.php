<?php
	include_once('config.php');
	$user=$_POST['user_id'];
	$phone='0000000000';

	$sql ="SELECT * FROM donor WHERE user_id='$user' ";
	$query=$conn->query($sql);
	if($query->num_rows >0){
		while($row=$query->fetch_array()){
			$phone=$row['Phone'];
			

		}
		echo $phone;

	}else{
		echo 'error';
	}
	


	?>