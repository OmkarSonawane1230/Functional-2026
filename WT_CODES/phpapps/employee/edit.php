<?php
require_once 'db.php';

$id = $_GET['id'];
$result = $conn->query("SELECT * FROM employees WHERE id = $id");
$employee = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $position = $_POST['position'];
    $salary = $_POST['salary'];

    $stmt = $conn->prepare("UPDATE employees SET name=?, email=?, position=?, salary=? WHERE id=?");
    $stmt->bind_param("sssdi", $name, $email, $position, $salary, $id);
    
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
    <title>Edit Employee</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Edit Employee</h2>
        <form method="POST" action="">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="<?php echo htmlspecialchars($employee['name']); ?>" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="<?php echo htmlspecialchars($employee['email']); ?>" required>
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" name="position" value="<?php echo htmlspecialchars($employee['position']); ?>" required>
            </div>
            <div class="form-group">
                <label>Salary</label>
                <input type="number" step="0.01" name="salary" value="<?php echo htmlspecialchars($employee['salary']); ?>" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Employee</button>
            <a href="index.php" class="btn btn-secondary" style="margin-left: 10px;">Cancel</a>
        </form>
    </div>
</body>
</html>
