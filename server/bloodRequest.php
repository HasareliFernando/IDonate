<?php
	include_once('config.php');
	$input1=$_POST['bloodRequest_select1'];
	$input2=$_POST['bloodRequest_select2'];
	$input3=$_POST['Location'];
	$input4=$_POST['Location2'];
	
	$a = array();
	$i=0;
	$sql="INSERT INTO request(user_id,blood_group,blood_type,latitude,longitude) VALUES('donor1','$input1','$input2','$input3','$input4')";
	if($conn->query($sql)===TRUE){
		
		$sms= "SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(('$input3' - latitude) *  pi()/180 / 2), 2) +COS( '$input3' * pi()/180) * COS(latitude * pi()/180) * POWER(SIN(( '$input4' - longitude) * pi()/180 / 2), 2) ))) as distance  from donor  having  distance <= 5 and blood_group='A+' order by distance";
		$query=$conn->query($sms);
		if($query->num_rows >0){
			while($row =$query->fetch_array()){
				$user_id=$row['user_id'];
				$a[$i]=$user_id;
				$i=$i+1;
			}
			for($c=0; $c<$i; $c++){
				echo $a[$c];
			}
		}
	}
	else{
		echo'Sending Fail';
	}
	?>