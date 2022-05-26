using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class PostListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } // This is description post
        public int Likes { get; set; }
        public DateTime Created { get; set; }
        public bool PrivatePost { get; set; }
        public int UserId { get; set; }
        public PostUserDto User { get; set; }
        public ICollection<CommentsDto> Comments { get; set; }
        public ICollection<LikesDto> LikeDet { get; set; }
        public string PhotoUrl { get; set; } // Photo of the user
        public CategoryDto Category { get; set; }
        public string Url { get; set; } // YouTube Url
    }
}
