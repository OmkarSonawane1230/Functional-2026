import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.*;

public class LoginServlet extends HttpServlet {

 protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {

  try(Connection con = DBUtil.getConnection()) {

   PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM students WHERE username=? AND password=?"
   );

   ps.setString(1, req.getParameter("username"));
   ps.setString(2, req.getParameter("password"));

   ResultSet rs = ps.executeQuery();

   if(rs.next()){
     HttpSession session = req.getSession();

     session.setAttribute("name", rs.getString("name"));
     session.setAttribute("gender", rs.getString("gender"));
     session.setAttribute("email", rs.getString("email"));
     session.setAttribute("college", rs.getString("college"));
     session.setAttribute("branch", rs.getString("branch"));
     session.setAttribute("mobile", rs.getString("mobile"));
     session.setAttribute("username", rs.getString("username"));

     res.sendRedirect("dashboard.jsp");
   }
   else {
     res.sendRedirect("login.jsp");
   }
  }
  catch(Exception e){ e.printStackTrace(); }
 }
}