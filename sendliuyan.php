<?php   

session_start();
header("Content-type: application/json");

if(!isset($_SESSION["nickname"]) || !isset($_SESSION["username"]))
{
    echo "请先登陆";
    exit;
}




$con=mysqli_connect("localhost","root","","liuyanban");

$content=$_POST["content"];
$nickname=$_SESSION["nickname"];
$username=$_SESSION["username"];

if($content=="")
{
    echo "请输入留言";
    exit;
}

// $sql="INSERT INTO record(username,nickname,content,`time`) VALUES ('$username','$nickname', '$content', now())";
$sql="INSERT INTO record(username,nickname,content,`time`) VALUES (?, ?, ?, now())";
// mysqli_query($con,$sql);
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, "sss", $username, $nickname, $content);
mysqli_execute($stmt);

echo "发表成功";

//', ''); DELETE FROM record WHERE id = 13 # 