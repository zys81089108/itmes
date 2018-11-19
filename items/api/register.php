<?php
	include('config/connect.php');
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	$hePhone = $_POST['hePhone'];
	$birthday = $_POST['birthday'];
	$email = $_POST['email'];
	
	$res = mysql_query("select * from loginregister where username = '$username'");
	$test = mysql_fetch_row($res);
	
    if($password){
       mysql_query("insert into loginregister(username,password,hePhone,birthday,email) values ('$username','$password','$hePhone','$birthday','$email')");  
       echo '{"code": 1}';
    }
    if($test)
       echo '{"code": 0}';
	mysql_close();
?>