<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Bank Application - EJB Demo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 400px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .balance-card {
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        .balance-label {
            font-size: 14px;
            color: #5f6368;
            margin-bottom: 5px;
        }
        .balance-amount {
            font-size: 32px;
            font-weight: bold;
            color: #1a73e8;
        }
        input[type="number"] {
            width: 100%;
            padding: 12px 15px;
            margin: 15px 0;
            border: 1px solid #dadce0;
            border-radius: 25px;
            font-size: 16px;
            box-sizing: border-box;
            outline: none;
        }
        input[type="number"]:focus {
            border-color: #1a73e8;
        }
        .btn-group {
            display: flex;
            gap: 10px;
        }
        input[type="submit"] {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .btn-deposit {
            background-color: #1a73e8;
            color: white;
        }
        .btn-withdraw {
            background-color: #f1f3f4;
            color: #3c4043;
            border: 1px solid #dadce0 !important;
        }
        .btn-deposit:hover {
            background-color: #1557b0;
        }
        .btn-withdraw:hover {
            background-color: #e8eaed;
        }
        .msg {
            margin-top: 20px;
            font-size: 14px;
            padding: 10px;
            border-radius: 4px;
        }
        .msg-info {
            color: #1a73e8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome Back</h1>
        
        <div class="balance-card">
            <div class="balance-label">Available Balance</div>
            <div class="balance-amount">
                ₹<%= (request.getAttribute("balance") != null) ? 
                        String.format("%.2f", (Double)request.getAttribute("balance")) : "0.00" %>
            </div>
        </div>

        <form action="BankServlet" method="post">
            <input type="number" step="0.01" name="amount" placeholder="Amount (₹)" required>
            
            <div class="btn-group">
                <input type="submit" name="action" value="Deposit" class="btn-deposit">
                <input type="submit" name="action" value="Withdraw" class="btn-withdraw">
            </div>
        </form>

        <% if (request.getAttribute("message") != null) { %>
            <div class="msg msg-info">
                <%= request.getAttribute("message") %>
            </div>
        <% } %>
    </div>
</body>
</html>
