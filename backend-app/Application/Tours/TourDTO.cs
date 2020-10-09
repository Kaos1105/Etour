using System;
using System.Collections.Generic;

namespace Domain
{
    public class TourDTO
    {
        public Guid TourId { get; set; }
        public string TourName { get; set; }
        public string TourType { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public int TourDuration { get; set; }
        public bool IsActive { get; set; }
        public virtual Place StartPlace { get; set; }
        public virtual Place EndPlace { get; set; }
    }
}