import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.*;

public class RegisterServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        try {
            Connection con = DBUtil.getConnection();
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO students(name,college,address,class,branch,gender,password) VALUES(?,?,?,?,?,?,?)"
            );

            ps.setString(1, req.getParameter("name"));
            ps.setString(2, req.getParameter("college"));
            ps.setString(3, req.getParameter("address"));
            ps.setString(4, req.getParameter("class"));
            ps.setString(5, req.getParameter("branch"));
            ps.setString(6, req.getParameter("gender"));
            ps.setString(7, req.getParameter("password"));

            ps.executeUpdate();
            res.sendRedirect("login.jsp");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}