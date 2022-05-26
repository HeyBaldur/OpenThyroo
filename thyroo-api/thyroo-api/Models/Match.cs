using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class Match
    {
        public int Id { get; set; }
        public BusinessProfile BusinessProfile { get; set; } // Current user
        public int BusinessProfileId { get; set; }
        public BusinessProfile TargetBusinessProfile { get; set; }
        public int TargetBusinessProfileId { get; set; }
        public DateTime MatchDate { get; set; }
        public User User { get; set; } // Current user
        public int UserId { get; set; }

        public Match()
        {
            MatchDate = DateTime.Now;
        }
    }
}
