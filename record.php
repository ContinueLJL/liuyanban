<?php

$con=mysqli_connect("localhost","root","","liuyanban");

$sql="SELECT * FROM record ORDER BY `time` DESC";
$arr=array();
$res=mysqli_query($con,$sql);

while($row=mysqli_fetch_array($res))
{
$arr[]=$row;
}


    echo json_encode($arr);

