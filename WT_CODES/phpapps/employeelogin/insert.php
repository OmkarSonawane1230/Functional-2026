<?php
include "db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];

$sql = "INSERT INTO employees (name, email, mobile) VALUES ('$name', '$email', '$mobile')";

if (mysqli_query($conn, $sql)) {
    echo "Employee added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
