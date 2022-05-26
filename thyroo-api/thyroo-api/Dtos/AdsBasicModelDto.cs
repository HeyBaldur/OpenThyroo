using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.Dtos
{
    public class AdsBasicModelDto
    {
        public int Id { get; set; }
        public UserDetailsDto User { get; set; }
        public int UserId { get; set; }
        public AdsCampaignDto AdsCampaign { get; set; }
        public int AdsCampaignId { get; set; }
        public string Objective { get; set; }
        //public ProfileTypes ProfileTypes { get; set; }
        //public int ProfileTypesId { get; set; }
        //public ProfileSubTypes ProfileSubTypes { get; set; }
        //public int ProfileSubTypesId { get; set; }
        //public BusinessTypes BusinessOfInterest { get; set; }
        //public int BusinessOfInterestId { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public DateTime Starts { get; set; }
        public DateTime Ends { get; set; }
        public int Amount { get; set; }
        public string Audience { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string SponsoredBy { get; set; }
        public bool Active { get; set; }
        public int Clicks { get; set; } // With firebase
        public int Impressions { get; set; } // With firebase
        public int Engagements { get; set; } // With firebase
    }
}
