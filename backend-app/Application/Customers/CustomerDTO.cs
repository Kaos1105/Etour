using System;
using System.Collections.Generic;

namespace Domain
{
    public class CustomerDTO
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
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
    }
}