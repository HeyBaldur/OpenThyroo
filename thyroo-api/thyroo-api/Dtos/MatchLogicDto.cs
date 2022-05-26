using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    /// <summary>
    /// This logic object will return the right
    /// information about two different validations 
    /// at once.
    /// </summary>
    public class MatchLogicDto
    {
        public bool MatchExists { get; set; }
        public bool Matched { get; set; }
    }
}
