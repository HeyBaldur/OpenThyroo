using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class EmailForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string Subject { get; set; }
        public string EmailBody { get; set; }
        public bool Draft { get; set; }
        public bool Favorite { get; set; }
        public DateTime MessageSent { get; set; }

        public EmailForCreationDto()
        {
            MessageSent = DateTime.Now;
        }
    }
}
