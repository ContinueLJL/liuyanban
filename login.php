<?php
session_start();
header('Content-Type: application/json');

$con=mysqli_connect("localhost","root","","liuyanban");

$username=$_POST["username"];
$password=$_POST["password"];

if($username=="")
{
    echo "请输入账号";
    exit;
}
if($password=="")
{
    echo "请输入密码";
    exit;
}

// $sql="SELECT * FROM user_information WHERE username='$username'";
$sql="SELECT * FROM user_information WHERE username=?";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"s",$username);
mysqli_execute($stmt);
$res=mysqli_stmt_get_result($stmt);


// $res=mysqli_query($con, $sql);
$row=mysqli_fetch_array($res);

if($username != $row["username"])
{
    echo "账号不存在";
    exit;
}
if($password != $row["password"])
{
    echo "密码错误";
    exit;
}



$_SESSION["username"]=$row["username"];
$_SESSION["nickname"]=$row["nickname"];

echo "登陆成功";

























