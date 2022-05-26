using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class CommentsDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public PostUserDto User { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; } // This is the comment description
        public DateTime Created { get; set; }
        public int Likes { get; set; }
        public virtual ICollection<CommentsReplyDto> CommentsReplies { get; set; }
    }
}
