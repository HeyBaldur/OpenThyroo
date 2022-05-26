using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class FolloweeDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public PostUserDto Followee { get; set; }
        public int FolloweeId { get; set; }
    }
}
