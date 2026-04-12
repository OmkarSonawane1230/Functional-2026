package com.bank;

import jakarta.ejb.Stateless;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Stateless Session Bean using JDBC for MySQL persistence.
 */
@Stateless
public class BankBean {

    // Database connection details. useSSL=false solves keystore/certificate issues in dev environments
    private static final String DB_URL = "jdbc:mysql://localhost:3306/bank_db?useSSL=false&allowPublicKeyRetrieval=true";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "mysql123";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("Driver Class NotFound!");
            e.printStackTrace();
        }
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
    }

    public double getBalance() {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT balance FROM account WHERE id = 1")) {
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getDouble("balance");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0.0;
    }

    public String deposit(double amount) {
        if (amount <= 0) {
            return "Invalid deposit amount. Amount must be positive.";
        }
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement("UPDATE account SET balance = balance + ? WHERE id = 1")) {
            stmt.setDouble(1, amount);
            stmt.executeUpdate();
            return "Successfully deposited: ₹" + amount;
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while depositing funds.";
        }
    }

    public String withdraw(double amount) {
        if (amount <= 0) {
            return "Invalid withdrawal amount. Amount must be positive.";
        }
        double currentBalance = getBalance();
        if (amount > currentBalance) {
            return "Insufficient funds! Current balance: ₹" + currentBalance;
        }
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement("UPDATE account SET balance = balance - ? WHERE id = 1")) {
            stmt.setDouble(1, amount);
            stmt.executeUpdate();
            return "Successfully withdrawn: ₹" + amount;
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while withdrawing funds.";
        }
    }
}
