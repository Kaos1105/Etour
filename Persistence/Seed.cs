using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@gmail.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@gmail.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@gmail.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "P@ssw0rd");
                }
            }

            if (!context.Places.Any())
            {
                var places = new List<Place>
                {
                    new Place
                    {
                        PlaceName="VietNam",
                        IsActive=true,
                    },
                    new Place
                    {
                        PlaceName="Japan",
                        IsActive=true,
                    },
                    new Place
                    {
                        PlaceName="Korea",
                        IsActive=true,
                    },
                    new Place
                    {
                        PlaceName="China",
                        IsActive=true,
                    },
                };

                await context.Places.AddRangeAsync(places);
                await context.SaveChangesAsync();
            }
        }
    }
}
