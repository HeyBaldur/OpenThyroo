using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class ProfileViewData
    {
        public int Id { get; set; }
        public BusinessProfile BusinessProfile { get; set; } // Who sees my profile
        public int BusinessProfileId { get; set; }
        public BusinessProfile TargetBusinessProfile { get; set; } // Profile to see
        public int TargetBusinessProfileId { get; set; }
        public string Ip { get; set; }
        public DateTime DateView { get; set; }

        public ProfileViewData()
        {
            DateView = DateTime.Now;
        }
    }
}
