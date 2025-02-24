CREATE DATABASE IF NOT EXISTS customers_db;

USE customers_db;

CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT NOT NULL
);

INSERT INTO customer (name, email, age) VALUES
('John Doe', 'john.doe@example.com', 30),
('Jane Smith', 'jane.smith@example.com', 25),
('Michael Johnson', 'michael.johnson@example.com', 35);

CREATE USER IF NOT EXISTS 'test_user'@'%' IDENTIFIED WITH caching_sha2_password BY 'test_password';

GRANT ALL PRIVILEGES ON customers_db.* TO 'test_user'@'%';

-- Apply the changes
FLUSH PRIVILEGES;
