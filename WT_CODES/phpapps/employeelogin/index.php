<!DOCTYPE html>
<html>
<head>
    <title>Employee Management</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="script.js"></script>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Employees</h1>
            <p>Manage employee records</p>
        </div>
        
        <form id="employeeForm">
            <div class="form-group">
                <input type="text" id="name" name="name" placeholder="Name" required>
            </div>
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="tel" id="mobile" name="mobile" placeholder="Mobile" required>
            </div>
            <button type="button" class="btn" onclick="addEmployee()">Add Employee</button>
            <div class="clear"></div>
        </form>

        <div id="employeeList">
            <!-- AJAX will load employee list here -->
        </div>
    </div>

    <script>
        // Initial load
        window.onload = function() {
            fetchEmployees();
        };
    </script>
</body>
</html>
