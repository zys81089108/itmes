<?php 
	include("config/connect.php");
	
    
	$id = $_POST["id"];
	$arr = $_POST["arr"];
	
	if($arr){
	foreach($arr as $key => $val){
	    $str = $str.$arr[$key].',' ;  //$str拼接$arr里的每个id值在拼接上逗号
	    };
	    //获取前端传送需要的数据值
	    $str = substr($str,0,-1); //截取掉最后一个逗号 返回字符串
	    $sql = "select * from detail where id in($str)";
	    $res = mysql_query($sql);
	    $arr = array();
	    while($row = mysql_fetch_assoc($res)){
	        array_push($arr, $row);
	    };
	    
	    $data = array();
	    if($arr){
	        $data["detail"] = $arr;
	        $data["code"] = 1;
	    }else{
	        $data["code"] = 0;
	    }
	     echo json_encode($data);
	};
	
	if($id){
    	$sql = "select * from detail where id=$id";
        
        $res = mysql_query($sql);
        
        $arr = array();
        
        while($row = mysql_fetch_assoc($res)){
            $arr["detail"] = $row;
        }
        
        if($arr["detail"]){
            $arr["code"] = 1;
        }else{
            $arr["code"] = 0;
        }
    
        echo json_encode($arr);   
	}

 ?>      