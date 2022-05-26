using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class MatchDto
    {
        public int Id { get; set; }
        public BusinessProfileDto BusinessProfile { get; set; } // Current user
        public int BusinessProfileId { get; set; }
        public BusinessProfileDto TargetBusinessProfile { get; set; }
        public int TargetBusinessProfileId { get; set; }
        public DateTime MatchDate { get; set; }
        public UserDetailsDto User { get; set; }
        public int UserId { get; set; }
    }
}
