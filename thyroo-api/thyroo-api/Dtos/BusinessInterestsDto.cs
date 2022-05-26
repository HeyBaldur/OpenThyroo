using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.Dtos
{
    public class BusinessInterestsDto
    {
        public int Id { get; set; }
        public BusinessProfileDto BusinessProfile { get; set; }
        public int BusinessProfileId { get; set; }
        public ProfileTypes ProfileTypes { get; set; }
        public int ProfileTypesId { get; set; }
        public ProfileSubTypes ProfileSubTypes { get; set; }
        public int ProfileSubTypesId { get; set; }
        public BusinessTypes BusinessOfInterest { get; set; }
        public int BusinessOfInterestId { get; set; }
    }
}
