using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Models
{
    public class BusinessInterests
    {
        public int Id { get; set; }
        public BusinessProfile BusinessProfile { get; set; }
        public int BusinessProfileId { get; set; }
        public ProfileTypes ProfileTypes { get; set; }
        public int ProfileTypesId { get; set; }
        public ProfileSubTypes ProfileSubTypes { get; set; }
        public int ProfileSubTypesId { get; set; }
        public BusinessTypes BusinessOfInterest { get; set; }
        public int BusinessOfInterestId { get; set; }
    }
}
