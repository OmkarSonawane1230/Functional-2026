<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<title>Edit Book</title>

<style>
body{
    font-family:Arial;
    background:#f4f6f9;
    padding:40px;
}

form {
    display: flex;
    flex-direction: column;
}

.box{
    max-width:420px;
    margin:auto;
    background:white;
    padding:30px;
    border-radius:12px;
    border: 1px solid rgb(175, 175, 175);
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
    width:100%;
    margin-top:18px;
    padding:12px;
    background:#2196F3;
    border:none;
    color:white;
    border-radius:6px;
    font-size:16px;
}
</style>
</head>

<body>

<div class="box">

<h2>Edit Book</h2>

<%
ResultSet rs=(ResultSet)request.getAttribute("book");
if(rs!=null && rs.next()){
%>

<form action="BookServlet" method="post">
<input type="hidden" name="action" value="update">
<input type="hidden" name="id" value="<%= rs.getInt("book_id") %>">

<label>Title</label>
<input name="title" value="<%= rs.getString("title") %>" required>

<label>Author</label>
<input name="author" value="<%= rs.getString("author") %>" required>

<label>Price</label>
<input name="price" value="<%= rs.getFloat("price") %>" required>

<button>Update Book</button>
</form>

<% } %>

</div>

</body>
</html>