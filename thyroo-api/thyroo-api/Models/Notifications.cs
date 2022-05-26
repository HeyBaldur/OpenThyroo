using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Notifications
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public User Recipient { get; set; }
        public int RecipientId { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool Read { get; set; }

        public Notifications()
        {
            NotificationDate = DateTime.Now;
        }
    }
}
