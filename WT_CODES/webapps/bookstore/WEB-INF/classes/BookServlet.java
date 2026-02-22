import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.*;

public class BookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String action = req.getParameter("action");

        try (Connection con = DBUtil.getConnection()) {

            if ("delete".equals(action)) {
                int id = Integer.parseInt(req.getParameter("id"));
                PreparedStatement ps = con.prepareStatement(
                    "DELETE FROM book WHERE book_id=?");
                ps.setInt(1, id);
                ps.executeUpdate();
                res.sendRedirect("BookServlet");
            }

            else if ("edit".equals(action)) {
                int id = Integer.parseInt(req.getParameter("id"));
                PreparedStatement ps = con.prepareStatement(
                    "SELECT * FROM book WHERE book_id=?");
                ps.setInt(1, id);
                ResultSet rs = ps.executeQuery();
                req.setAttribute("book", rs);
                req.getRequestDispatcher("edit.jsp").forward(req, res);
            }

            else {
                Statement st = con.createStatement();
                ResultSet rs = st.executeQuery("SELECT * FROM book");
                req.setAttribute("list", rs);
                req.getRequestDispatcher("index.jsp").forward(req, res);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws IOException {

        String action = req.getParameter("action");

        try (Connection con = DBUtil.getConnection()) {

            if ("add".equals(action)) {
                PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO book(title,author,price) VALUES(?,?,?)");
                ps.setString(1, req.getParameter("title"));
                ps.setString(2, req.getParameter("author"));
                ps.setFloat(3, Float.parseFloat(req.getParameter("price")));
                ps.executeUpdate();
            }

            else if ("update".equals(action)) {
                PreparedStatement ps = con.prepareStatement(
                    "UPDATE book SET title=?,author=?,price=? WHERE book_id=?");
                ps.setString(1, req.getParameter("title"));
                ps.setString(2, req.getParameter("author"));
                ps.setFloat(3, Float.parseFloat(req.getParameter("price")));
                ps.setInt(4, Integer.parseInt(req.getParameter("id")));
                ps.executeUpdate();
            }

            res.sendRedirect("BookServlet");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}