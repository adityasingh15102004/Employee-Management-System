CREATE DATABASE EmployeeManagementDB;
GO
USE EmployeeManagementDB;
GO
CREATE TABLE Employees (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(MAX) NOT NULL,
    DateOfBirth DATETIME2 NOT NULL,
    DateOfJoining DATETIME2 NOT NULL,
    Department NVARCHAR(MAX) NOT NULL,
    Salary DECIMAL(18,2) NOT NULL
);
GO
INSERT INTO Employees (Name, DateOfBirth, DateOfJoining, Department, Salary)
VALUES 
('John Doe', '1990-05-15', '2020-01-10', 'IT', 60000),
('Jane Smith', '1985-08-22', '2018-03-15', 'HR', 55000),
('Mike Johnson', '1992-11-02', '2021-06-01', 'Finance', 75000),
('Emily Davis', '1988-04-30', '2019-09-20', 'Marketing', 50000),
('Robert Brown', '1995-01-25', '2022-11-01', 'IT', 65000);
GO
SELECT * from Employees;

