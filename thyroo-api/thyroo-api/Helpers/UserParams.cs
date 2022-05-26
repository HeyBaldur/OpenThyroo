using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Helpers
{
    public class UserParams
    {

        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        // Here starts the filtering
        public int UserId { get; set; }
        public int BusinessTypeId { get; set; }
        public int ProfileTypeId { get; set; }
        public int ProfileSubTypeId { get; set; }

        // New criteria
        public int CountryId { get; set; }
        public string Title { get; set; }
        public string City { get; set; }

        // Name criteria
        public string Name { get; set; }
    }
}
