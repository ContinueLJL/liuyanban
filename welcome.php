<?php

session_start();

if(!isset($_SESSION["nickname"]))
{
    exit;
}




$nickname=$_SESSION["nickname"];

echo "欢迎你，".$nickname;