using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } // This is description post
        public int Likes { get; set; }
        public DateTime Created { get; set; }
        public bool PrivatePost { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string PhotoUrl { get; set; }
    }
}
