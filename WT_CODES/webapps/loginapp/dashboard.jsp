<%@ page import="java.sql.*" %>
<link rel="stylesheet" href="style.css">

<div class="card">
<h2>Your Details</h2>

<%
ResultSet rs = (ResultSet) session.getAttribute("student");
%>

<p>Name: <%= rs.getString("name") %></p>
<p>College: <%= rs.getString("college") %></p>
<p>Address: <%= rs.getString("address") %></p>
<p>Class: <%= rs.getString("class") %></p>
<p>Branch: <%= rs.getString("branch") %></p>
<p>Gender: <%= rs.getString("gender") %></p>

</div>