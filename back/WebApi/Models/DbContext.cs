using Microsoft.EntityFrameworkCore;
using pruebaMsCloud.Models;

namespace test4.Models
{
    public class DbContextTest : DbContext
    {

        public DbContextTest(DbContextOptions<DbContextTest> options) : base(options)
        {

        }

        public DbSet<Deportista> Deportistas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }

}
