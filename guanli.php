<?php
session_start();
header('Content-Type: application/json');

if(!isset($_SESSION["username"]))
{
    echo "请先登陆";
    exit;
}
$con=mysqli_connect("localhost","root","","liuyanban");

$username=$_SESSION["username"];
$sql="SELECT * FROM record WHERE username='$username' ORDER BY `time` DESC";

$res=mysqli_query($con,$sql);
$arr=array();
while($row=mysqli_fetch_array($res))
{
    $arr[]=$row;
}

echo json_encode($arr);