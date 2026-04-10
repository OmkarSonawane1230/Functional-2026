<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $position = $_POST['position'];
    $salary = $_POST['salary'];

    $stmt = $conn->prepare("INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssd", $name, $email, $position, $salary);
    
    if ($stmt->execute()) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Employee</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Add New Employee</h2>
        <form method="POST" action="">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" name="position" required>
            </div>
            <div class="form-group">
                <label>Salary</label>
                <input type="number" step="0.01" name="salary" required>
            </div>
            <button type="submit" class="btn btn-primary">Save Employee</button>
            <a href="index.php" class="btn btn-secondary" style="margin-left: 10px;">Cancel</a>
        </form>
    </div>
</body>
</html>
