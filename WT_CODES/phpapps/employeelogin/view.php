<?php
include "db.php";

$sql = "SELECT * FROM employees ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "<table>";
    echo "<tr><th>Name</th><th>Email</th><th>Mobile</th></tr>";
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>" . $row["name"] . "</td>";
        echo "<td>" . $row["email"] . "</td>";
        echo "<td>" . $row["mobile"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No employees found.";
}

mysqli_close($conn);
?>
