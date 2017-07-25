<?php
	include_once('config.php');
	$user=$_POST['userid'];
	$input1=$_POST['bloodRequest_select1'];
	$input2=$_POST['bloodRequest_select2'];
	$input3=$_POST['Location'];
	$input4=$_POST['Location2'];
	$date=date("Y/m/d");
	$time=date("h:i:s");
	$reqid="";
	$donor_array = array();
	$phone_array = array();
	$firstlist=array();
	$i=0;
	$c=0;
	$num=0;
	$sql="INSERT INTO request(user_id,blood_group,blood_type,latitude,longitude) VALUES('$user','$input1','$input2','$input3','$input4')";
	if($conn->query($sql)===TRUE){
		$id="SELECT MAX(req_id) AS id from request";
		$queryid=$conn->query($id);
		if($queryid->num_rows >0){
			while($row =$queryid->fetch_array()){
				$reqid=$row['id'];
			}
		}

		for($c=5;$c<21;$c++){
			$sms= "SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(('$input3' - latitude) *  pi()/180 / 2), 2) +COS( '$input3' * pi()/180) * COS(latitude * pi()/180) * POWER(SIN(( '$input4' - longitude) * pi()/180 / 2), 2) ))) as distance  from donor  having  distance <= $c and blood_group='$input1' and eligibleStatus=TRUE and user_id!='$user' order by distance";
			$query=$conn->query($sms);
			if($query->num_rows >0){
				while($row =$query->fetch_array()){
					$user_id=$row['user_id'];
					$tel=$row['Phone'];

					$donor_array[$i]=$user_id;
					$phone_array[$i]=$tel;
					$i=$i+1;
				}
				if($i>20){
					break;
				}
				else{
					$i=0;
					$c=$c+5;
				}
				
			}
		}foreach ($donor_array as $value) {
			
			$req="INSERT INTO notification(req_id,user_id, requester_id, blood_group, latitude, longtitute, date, time, approve) VALUES ('$reqid','$value','donor1','$input1','$input3','$input4','$date','$time',0)";
			if($conn->query($req)===TRUE){
				
				$num=$num+1;

			}
			else{
				echo "not";
			}

		}
	if(count($phone_array) >= 10){
		for($i=0;$i<10;$i++){
			$firstlist[$i]=$phone_array[$i];
		}
		$string_array=implode(",",$firstlist);
		echo $string_array;
	}elseif(count($phone_array) > 0){
		$string_array=implode(",",$phone_array);
		echo $string_array;
	}else{
		echo 'No Eligible Donors Found';
	}
	}
	else{
		
		echo'Sending Fail';
	}
	
	?>