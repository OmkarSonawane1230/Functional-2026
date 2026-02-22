import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.*;

public class RegisterServlet extends HttpServlet {

 protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {

  try(Connection con = DBUtil.getConnection()) {

   PreparedStatement ps = con.prepareStatement(
    "INSERT INTO students(name,gender,email,college,branch,mobile,username,password) VALUES(?,?,?,?,?,?,?,?)"
   );

   ps.setString(1, req.getParameter("name"));
   ps.setString(2, req.getParameter("gender"));
   ps.setString(3, req.getParameter("email"));
   ps.setString(4, req.getParameter("college"));
   ps.setString(5, req.getParameter("branch"));
   ps.setString(6, req.getParameter("mobile"));
   ps.setString(7, req.getParameter("username"));
   ps.setString(8, req.getParameter("password"));

   ps.executeUpdate();
   res.sendRedirect("login.jsp");
  }
  catch(Exception e){ e.printStackTrace(); }
 }
}