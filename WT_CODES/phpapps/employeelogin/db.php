<?php
$host = "localhost";
$username = "root";
$password = "mysql123";
$dbname = "employee_db";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
