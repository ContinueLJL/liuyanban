<?php

header('Content-Type: application/json');

$con=mysqli_connect("localhost","root","","liuyanban");

$content=$_POST["content"];
$id=$_POST["id"];
// $sql="UPDATE record SET content='$content' WHERE id='$id'";
$sql="UPDATE record SET content=? WHERE id='$id'";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"s",$content);
mysqli_execute($stmt);


// mysqli_query($con,$sql);

echo "修改成功";