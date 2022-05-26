using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class ProfileViewDataDto
    {
        public int Id { get; set; }
        public BusinessProfileDto BusinessProfile { get; set; } // Who sees my profile
        public int BusinessProfileId { get; set; }
        public int TargetBusinessProfileId { get; set; }
        public string Ip { get; set; }
        public DateTime DateView { get; set; }
    }
}
