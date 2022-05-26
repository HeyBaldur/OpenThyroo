using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class LikesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
    }
}
