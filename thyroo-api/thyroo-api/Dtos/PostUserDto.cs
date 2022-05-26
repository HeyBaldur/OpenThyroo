using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class PostUserDto
    {
        public int Id { get; set; }
        //public string EmailAddress { get; set; }
        //public string Username { get; set; }
        public DateTime EnrollmentDate { get; set; }
        //public DateTime LastActive { get; set; }
        //public string FirstName { get; set; }
        //public string MiddleNmae { get; set; }
        //public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        //public string Country { get; set; }
        //public bool AccountBlocked { get; set; }
        public bool VerifiedAccount { get; set; }
        //public string Uid { get; set; }
        public string ProviderFullName { get; set; }
        public string Occupation { get; set; }
        public string Location { get; set; }
        public int BusinessId { get; set; } // Business profile id
    }
}
