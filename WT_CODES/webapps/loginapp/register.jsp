<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="styles.css">
<title>Student Registration</title>
</head>

<body class="center">

<form class="card" action="register" method="post">

<h2 class="title">Student Registration</h2>

<div class="form-row">
  <label>Name *</label>
  <input class="input" name="name" required>
</div>

<div class="form-row">
  <label>Gender *</label>
  <div class="radio-group">
    <label><input type="radio" name="gender" value="Male" checked> Male</label>
    <label><input type="radio" name="gender" value="Female"> Female</label>
  </div>
</div>

<div class="form-row">
  <label>Email *</label>
  <input class="input" type="email" name="email" required>
</div>

<div class="form-row">
  <label>College *</label>
  <input class="input" name="college">
</div>

<div class="form-row">
  <label>Branch *</label>
  <input class="input" name="branch">
</div>

<div class="form-row">
  <label>Mobile *</label>
  <input class="input" name="mobile">
</div>

<div class="form-row">
  <label>Username *</label>
  <input class="input" name="username">
</div>

<div class="form-row">
  <label>Password *</label>
  <input class="input" type="password" name="password">
</div>

<button class="btn">Submit</button>

</form>

</body>
</html>