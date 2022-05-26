using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string BannerPhoto { get; set; }
    }
}
