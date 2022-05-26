using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class ArticleToUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } // This is description post
        public int UserId { get; set; }
    }
}
