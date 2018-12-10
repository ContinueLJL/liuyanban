<?php

header('Content-Type: application/json');

$con=mysqli_connect("localhost","root","","liuyanban");

$nickname=$_POST["nickname"];
$username=$_POST["username"];
$password=$_POST["password"];
$checkpw=$_POST["checkpw"];

if($nickname=="")
{
    echo "请输入用户名";
    exit;
}
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
if($checkpw=="")
{
    echo "请再一次输入密码";
    exit;
}


if(iconv_strlen($nickname,"utf-8") > 16)
{
    echo "用户名不允许超过16个字符";
    exit;
}
if(is_numeric($username) == false  ||  iconv_strlen($username,"utf-8") > 16)
{
    echo "请输入不超过16个字符的数字账号";
    exit;
}
if(iconv_strlen($password,"utf-8") > 16)
{
    echo "密码不允许超过16个字符";
    exit;
}
if(substr_count($password," ") > 0)
{
    echo "密码不允许含空格";
    exit;
}



// $sql="SELECT * FROM user_information WHERE username='$username'";
$sql="SELECT * FROM user_information WHERE username=?";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"s",$username);
mysqli_execute($stmt);
$res=mysqli_stmt_get_result($stmt);




// $res=mysqli_query($con,$sql);
$row=mysqli_fetch_array($res);

if($username == $row["username"])
{
    echo "账号已存在";
    exit;
}
if($password != $checkpw)
{
    echo "两次输入密码不一致";
    exit;
}

// $sql="INSERT INTO user_information(username,nickname,`password`) VALUES ('$username', '$nickname', '$password')";
$sql="INSERT INTO user_information(username,nickname,`password`) VALUES (?, ?, ?)";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"sss",$username,$nickname,$password);
mysqli_execute($stmt);


// mysqli_query($con, $sql);
echo "注册成功";































