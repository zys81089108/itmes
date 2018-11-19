<?php
    include('config/connect.php');
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $res = mysql_query("select * from loginregister where username = '$username' and password = '$password'");
    $test = mysql_num_rows($res);
    
    if($test > 0){
        echo '{"code": 1}';
    }else{
         $res = mysql_query("select * from loginregister where username = '$username'");
         $test = mysql_num_rows($res);
         if($test > 0)
            echo '{"code": 2}';
         else
            echo '{"code": 3}';
    }
    mysql_close();
?>