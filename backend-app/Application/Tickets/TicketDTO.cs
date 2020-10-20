using System;
using System.Collections.Generic;

namespace Domain
{
    public class TicketDTO
    {
        public Guid TicketId { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public long TicketPrice { get; set; }
        public bool IsActive { get; set; }
        public Guid TripId { get; set; }
        public Guid CustomerId { get; set; }
        //public virtual Customer Customer { get; set; }
        //public virtual Trip Trip { get; set; }
    }
}