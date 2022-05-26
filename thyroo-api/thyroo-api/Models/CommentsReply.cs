using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class CommentsReply
    {
        public int Id { get; set; }
        public Comment Comment { get; set; }
        public int CommentId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; } // This is the reply description
        public DateTime Created { get; set; }
        public int Likes { get; set; }
    }
}
