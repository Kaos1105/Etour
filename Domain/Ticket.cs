using System;
using System.Collections.Generic;

namespace Domain
{
    public class Ticket
    {
        public Guid TicketId { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public long TicketPrice { get; set; }
        public Trip Trip { get; set; }
        public bool IsActive { get; set; }
        public virtual Customer Customer { get; set; }
    }
}