using BusinessObjectLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Data
{
    public class ManageDb: DbContext
    {
        public ManageDb(DbContextOptions options) : base(options) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .HasKey(x => x.BookId);

            modelBuilder.Entity<User>()
                .HasKey(x => x.Username);

            modelBuilder.Entity<Booking>()
                .HasKey(x => x.BookingId);
        }
    }
}
