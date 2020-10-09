using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Place> Places { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<HelperCode> HelperCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Give Identity primary string
            base.OnModelCreating(builder);

            //Many-to-many relationship define
            // builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));
            // //1-n:User-UserActivities
            // builder.Entity<UserActivity>().HasOne(u => u.AppUser).WithMany(a => a.UserActivities).HasForeignKey(u => u.AppUserId);
            // //1-n:Activity-UserActivities
            // builder.Entity<UserActivity>().HasOne(a => a.Activity).WithMany(u => u.UserActivities).HasForeignKey(a => a.ActivityId);
            // //n-n-:Following-Follower
            // builder.Entity<UserFollowing>(b =>
            // {
            //     b.HasKey(k => new { k.ObserverId, k.TargetId });
            //     b.HasOne(o => o.Observer).WithMany(f => f.Followings).HasForeignKey(o => o.ObserverId).OnDelete(DeleteBehavior.Restrict);
            //     b.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId).OnDelete(DeleteBehavior.Restrict);
            // });
        }
    }
}
