using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; } // This is the comment description
        public DateTime Created { get; set; }
        public int Likes { get; set; }
        public virtual ICollection<CommentsReply> CommentsReplies { get; set; }
    }
}
