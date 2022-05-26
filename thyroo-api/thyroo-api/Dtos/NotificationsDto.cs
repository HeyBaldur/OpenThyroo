using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class NotificationsDto
    {
        public int Id { get; set; }
        public PostUserDto User { get; set; }
        public int UserId { get; set; }
        public PostUserDto Recipient { get; set; }
        public int RecipientId { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool Read { get; set; }
    }
}
