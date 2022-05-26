using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.Dtos
{
    public class UserDetailsDto
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Username { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime LastActive { get; set; }
        public string FirstName { get; set; }
        public string MiddleNmae { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public string Country { get; set; }
        public bool AccountBlocked { get; set; }
        public bool VerifiedAccount { get; set; }
        public string ProviderFullName { get; set; }
        public string Uid { get; set; }
        public int BusinessId { get; set; } // Business profile id

        // Account settings
        public bool AllowSearchEngines { get; set; }
        public bool AllowUsersCommentYourPosts { get; set; }
        public bool AllowUsersCommentYourArticles { get; set; }
        public bool AllowUsersToMatchYou { get; set; }
        public bool AllowUsersTranslateYourActivity { get; set; }

        // Account Notifications
        public bool MatchSession { get; set; }
        public bool SpaceInvites { get; set; }
        public string Occupation { get; set; }
        public string Location { get; set; }

        // Authentication
        public bool ForgotPassword { get; set; }
    }
}
