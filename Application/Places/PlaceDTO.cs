using System;
using System.Collections.Generic;

namespace Domain
{
    public class PlaceDTO
    {
        public Guid PlaceId { get; set; }
        public string PlaceName { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public bool IsActive { get; set; }
        public Place ParentPlace { get; set; }
    }
}