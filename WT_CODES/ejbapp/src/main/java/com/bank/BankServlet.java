package com.bank;

import java.io.IOException;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/BankServlet")
public class BankServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
    private BankBean bankBean;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String message = "";
        
        try {
            double amount = Double.parseDouble(request.getParameter("amount"));
            if ("Deposit".equals(action)) {
                message = bankBean.deposit(amount);
            } else if ("Withdraw".equals(action)) {
                message = bankBean.withdraw(amount);
            }
        } catch (NumberFormatException e) {
            message = "Error: Please enter a valid number!";
        }

        // Forward directly back to the JSP page
        request.setAttribute("message", message);
        request.setAttribute("balance", bankBean.getBalance());
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("balance", bankBean.getBalance());
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}
