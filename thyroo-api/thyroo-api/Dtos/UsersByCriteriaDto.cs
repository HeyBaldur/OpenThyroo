using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class UsersByCriteriaDto
    {
        public int BusinessTypeId { get; set; }
        public int ProfileTypeId { get; set; }
        public int ProfileSubTypeId { get; set; }
    }
}
