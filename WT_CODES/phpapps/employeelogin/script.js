function fetchEmployees() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "view.php", true);
    xhr.onload = function() {
        if (this.status == 200) {
            document.getElementById('employeeList').innerHTML = this.responseText;
        }
    };
    xhr.send();
}

function addEmployee() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;

    if (name == "" || email == "" || mobile == "") {
        alert("All fields are required");
        return;
    }

    var params = "name=" + name + "&email=" + email + "&mobile=" + mobile;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "insert.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (this.status == 200) {
            alert(this.responseText);
            document.getElementById('employeeForm').reset();
            fetchEmployees();
        }
    };
    xhr.send(params);
}
