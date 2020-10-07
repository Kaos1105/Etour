using System;
using System.Collections.Generic;

namespace Domain
{
    public class Trip
    {
        public Guid TripId { get; set; }
        public Tour Tour { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public long Price { get; set; }
        public bool IsActive { get; set; }
        public string TripType { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }

    }
}