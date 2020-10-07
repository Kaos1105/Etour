﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContextSample : IdentityDbContext<AppUser>
    {
        public DataContextSample(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> Followings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Give Identity primary string
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 1" },
                new Value { Id = 2, Name = "Value 2" },
                new Value { Id = 3, Name = "Value 3" },
                new Value { Id = 4, Name = "Value 4" }
            );

            //Many-to-many relationship define
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));
            //1-n:User-UserActivities
            builder.Entity<UserActivity>().HasOne(u => u.AppUser).WithMany(a => a.UserActivities).HasForeignKey(u => u.AppUserId);
            //1-n:Activity-UserActivities
            builder.Entity<UserActivity>().HasOne(a => a.Activity).WithMany(u => u.UserActivities).HasForeignKey(a => a.ActivityId);
            //n-n-:Following-Follower
            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });
                b.HasOne(o => o.Observer).WithMany(f => f.Followings).HasForeignKey(o => o.ObserverId).OnDelete(DeleteBehavior.Restrict);
                b.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId).OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
