<!DOCTYPE html>
<html>
<head>
<title>Add Book</title>

<style>
body{
    font-family:Arial;
    background:#f4f6f9;
    padding:40px;
}

.box{
    max-width:420px;
    margin:auto;
    background:white;
    padding:30px;
    border-radius:12px;
    border: 1px solid rgb(175, 175, 175);
}

form {
    display: flex;
    flex-direction: column;
}
h2{
    text-align:center;
    margin-bottom:20px;
}

label{
    display:block;
    margin-top:10px;
    font-weight:bold;
}

input{
    padding:10px;
    margin-top:5px;
    border:1px solid #ccc;
    border-radius:6px;
}

button{
    margin-top:18px;
    padding:12px;
    background:#4CAF50;
    border:none;
    color:white;
    border-radius:6px;
    font-size:16px;
}
</style>
</head>

<body>

<div class="box">

<h2>Add Book</h2>

<form action="BookServlet" method="post">
<input type="hidden" name="action" value="add">

<label>Title</label>
<input name="title" required>

<label>Author</label>
<input name="author" required>

<label>Price</label>
<input name="price" required>

<button>Add Book</button>
</form>

</div>

</body>
</html>