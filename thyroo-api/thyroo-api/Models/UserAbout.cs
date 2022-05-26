using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class UserAbout
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string About { get; set; }
        public DateTime LastUpdate { get; set; }
        public string Email { get; set; }
    }
}
