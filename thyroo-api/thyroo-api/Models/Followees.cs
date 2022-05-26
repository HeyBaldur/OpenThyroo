using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Followees
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public User Followee { get; set; }
        public int FolloweeId { get; set; }
    }
}
