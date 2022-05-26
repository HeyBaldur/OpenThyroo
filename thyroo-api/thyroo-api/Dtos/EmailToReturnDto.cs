using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class EmailToReturnDto
    {
        public int Id { get; set; }
        public UserDetailsDto Sender { get; set; }
        public int SenderId { get; set; }
        public UserDetailsDto Recipient { get; set; }
        public int RecipientId { get; set; }
        public string Subject { get; set; }
        public string EmailBody { get; set; }
        public bool Draft { get; set; }
        public bool Favorite { get; set; }
        public bool Read { get; set; }
        public DateTime MessageSent { get; set; }
        public DateTime? DateRead { get; set; }
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}
