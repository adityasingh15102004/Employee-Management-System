
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // This represents the Employees table in SQL Server
        public DbSet<Employee> Employees { get; set; }
    }
}