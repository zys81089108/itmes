<?php
  include("config/connect.php");

  $from =$_POST['from'];
  $alltype = $_POST[$from];

  if($from !== 'search'){
    $sql = "select * from detail where $from = '$alltype'";
  }else{//找到表里所有列名
    $sql = "select column_name from information_schema.columns where table_name = 'detail'";
    $res = mysql_query($sql);
    $arr = array();
    //将所有列名添加到数组
    while($row = mysql_fetch_assoc($res)){
      array_push($arr, $row[column_name]);
    }
    //在将数组以逗号分隔成字符串
    $arr = implode(',', $arr);

    //将所有列明传入concat进行模糊查询
    $sql = "select * from detail where concat($arr) like '%$alltype%'";

  }

  $res = mysql_query($sql);

  $arr = array();

  while($row = mysql_fetch_assoc($res)){
    array_push($arr, $row);
  }

  $data = array();

if($arr){
    $data["list"] = $arr;
    $data["code"] = 1;
  }else{
    $data["code"] = 0;
  }

  echo json_encode($data);
   
  mysql_close();
?>