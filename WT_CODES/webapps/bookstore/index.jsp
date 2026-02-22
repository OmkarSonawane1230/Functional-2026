<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<title>Bookstore</title>
<style>
body{
    font-family: Arial, sans-serif;
    background:#f4f6f9;
    padding:40px;
}

.container{
    max-width:900px;
    margin:auto;
    background:white;
    padding:25px;
    border-radius:12px;
    border: 1px solid rgb(175, 175, 175);
}

h2{
    text-align:center;
    margin-bottom:20px;
}

.add-btn{
    display:block;
    width:140px;
    margin:0 auto 20px;
    text-align:center;
    padding:10px;
    background:#4CAF50;
    color:white;
    text-decoration:none;
    border-radius:6px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th, td{
    padding:12px;
    text-align:center;
}

th{
    background:#222;
    color:white;
}

tr:nth-child(even){
    background:#f5f5f5;
}

.action{
    display:flex;
    justify-content:center;
    gap:8px;
}

.action a{
    padding:6px 14px;
    border-radius:6px;
    color:white;
    text-decoration:none;
    font-size:14px;
}

.edit{ background:#2196F3; }
.delete{ background:#f44336; }

</style>
</head>

<body>

<div class="container">

<h2>Bookstore</h2>

<a class="add-btn" href="add.jsp">Add Book</a>

<table>
<tr>
<th>ID</th>
<th>Title</th>
<th>Author</th>
<th>Price</th>
<th>Action</th>
</tr>

<%
ResultSet rs = (ResultSet) request.getAttribute("list");
if(rs!=null){
while(rs.next()){
%>
<tr>
<td><%= rs.getInt("book_id") %></td>
<td><%= rs.getString("title") %></td>
<td><%= rs.getString("author") %></td>
<td><%= rs.getFloat("price") %></td>
<td>
<div class="action">
<a class="edit" href="BookServlet?action=edit&id=<%= rs.getInt("book_id") %>">Edit</a>
<a class="delete" href="BookServlet?action=delete&id=<%= rs.getInt("book_id") %>">Delete</a>
</div>
</td>
</tr>
<% }} %>

</table>

</div>

</body>
</html>