using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Customer : IdentityUser
    {
        public string Name { get; set; }
        public string CustomerType { get; set; }
        public string CitizenId { get; set; }
        public string PasssportId { get; set; }
        public DateTime PasssportExpiryDate { get; set; }
        public string VisaId { get; set; }
        public DateTime VisaExpiryDate { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual AppUser AppUser { get; set; }

    }
}