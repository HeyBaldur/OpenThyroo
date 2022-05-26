using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class AdsCampaignDto
    {
        public int Id { get; set; }
        public UserDetailsDto User { get; set; }
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
