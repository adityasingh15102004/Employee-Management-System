namespace EmployeeManagementApi.Models
{
    public class Employee
    {
        public int Id { get; set; } // Employee ID (Primary Key, auto-increments)
        public required string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; }
        public required string Department { get; set; }
        public decimal Salary { get; set; }
    }
}