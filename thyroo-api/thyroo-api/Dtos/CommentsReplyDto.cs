using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class CommentsReplyDto
    {
        public int Id { get; set; }
        public CommentsDto Comment { get; set; }
        public int CommentId { get; set; }
        public PostUserDto User { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; } // This is the reply description
        public DateTime Created { get; set; }
        public int Likes { get; set; }
    }
}
