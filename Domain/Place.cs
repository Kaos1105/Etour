using System;
using System.Collections.Generic;

namespace Domain
{
    public class Place
    {
        public Guid PlaceId { get; set; }
        public string PlaceName { get; set; }
        public Place ParentPlace { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; }
    }
}