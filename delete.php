<?php
header('Content-Type: application/json');

$con=mysqli_connect("localhost","root","","liuyanban");

$id=$_POST["id"];

$sql="DELETE FROM record WHERE id='$id'";

mysqli_query($con,$sql);

echo "删除成功";