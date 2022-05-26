using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class UserProviderAuthDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Uid { get; set; }
        public string PhotoUrl { get; set; }
        public string ProviderFullName { get; set; }
    }
}
