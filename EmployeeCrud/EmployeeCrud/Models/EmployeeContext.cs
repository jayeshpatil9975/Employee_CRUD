using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrud.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions opts) : base(opts)
        { }
        public DbSet<Employee> Employees { get; set; }
        
    }
}

