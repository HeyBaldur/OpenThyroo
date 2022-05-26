using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class AdsCampaign
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string AdName { get; set; }
        public int Spent { get; set; }
        public int KeyResults { get; set; }
        public int Clicks { get; set; }
        public int AverageCPM { get; set; }
        public DateTime Starts { get; set; }
        public DateTime Ends { get; set; }
    }
}
