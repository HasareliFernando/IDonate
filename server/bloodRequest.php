<?php
	include_once('config.php');
	$input1=$_POST['bloodRequest_select1'];
	$input2=$_POST['bloodRequest_select2'];
	$input3=$_POST['Location'];
	$input4=$_POST['Location2'];
	$date=date("Y/m/d");
	$time=date("h:i:s");
	$reqid="";
	$donor_array = array();
	$i=0;
	$c=0;
	$sql="INSERT INTO request(user_id,blood_group,blood_type,latitude,longitude) VALUES('donor1','$input1','$input2','$input3','$input4')";
	if($conn->query($sql)===TRUE){
		$id="SELECT MAX(req_id) AS id from request";
		$queryid=$conn->query($id);
		if($queryid->num_rows >0){
			while($row =$queryid->fetch_array()){
				$reqid=$row['id'];
			}
		}

		for($c=5;$c<21;$c++){
			$sms= "SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(('$input3' - latitude) *  pi()/180 / 2), 2) +COS( '$input3' * pi()/180) * COS(latitude * pi()/180) * POWER(SIN(( '$input4' - longitude) * pi()/180 / 2), 2) ))) as distance  from donor  having  distance <= $c and blood_group='$input1' and eligibleStatus=TRUE and user_id!='donor1' order by distance";
			$query=$conn->query($sms);
			if($query->num_rows >0){
				while($row =$query->fetch_array()){
					$user_id=$row['user_id'];
					$donor_array[$i]=$user_id;
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
			echo $reqid;
			$req="INSERT INTO notification(req_id,user_id, requester_id, blood_group, latitude, longtitute, date, time, approve) VALUES ('$reqid','$value','donor1','$input1','$input3','$input4','$date','$time',0)";
			if($conn->query($req)===TRUE){
				echo "send";

			}
			else{
				echo "not";
			}

		}
		$result[]=array('user_id'=>$donor_array,'requester_id'=>'donor1','blood_group'=>$input1,'latitude'=>$input3,'longitute'=>$input4);
		$json=array('status'=>1,'info'=>$result);
	}
	else{
		$json=array('status'=>0,'msg'=>'Fail');
		echo'Sending Fail';
	}
	@mysql_close($conn);
	header('Content-type:application/json');
	echo json_encode($json);
	?>