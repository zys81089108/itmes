<?php 
	header("Access-Control-Allow-Origin:*");
	
	include("config.php");

	mysql_connect($config["host"], $config["username"], $config["password"]);

	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	
    mysql_query("set names utf8");          
	mysql_selectdb($config["dbname"]);
 ?>