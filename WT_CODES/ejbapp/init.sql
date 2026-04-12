CREATE DATABASE IF NOT EXISTS bank_db;
USE bank_db;

CREATE TABLE IF NOT EXISTS account (
    id INT PRIMARY KEY AUTO_INCREMENT,
    balance DOUBLE DEFAULT 0.0
);

-- Initialize the account with balance 0.0 if not exists
INSERT INTO account (id, balance) 
SELECT 1, 0.0 
WHERE NOT EXISTS (SELECT 1 FROM account WHERE id = 1);
