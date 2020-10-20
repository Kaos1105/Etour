using System;
using System.Collections.Generic;

namespace Domain
{
    public class TripDTO
    {
        public Guid TripId { get; set; }
        public string TripName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public long Price { get; set; }
        public bool IsActive { get; set; }
        public string TripType { get; set; }
        public string TripStatus { get; set; }
        public int TripCapacity { get; set; }
        public virtual ICollection<TicketDTO> Tickets { get; set; }
        public virtual Tour Tour { get; set; }
    }
}