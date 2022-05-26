using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class FollowerDto
    {
        public int Id { get; set; }
        public PostUserDto UserDto { get; set; }
        public int UserId { get; set; }
        public int FolloweeId { get; set; }
        public bool Following { get; set; }
    }
}
