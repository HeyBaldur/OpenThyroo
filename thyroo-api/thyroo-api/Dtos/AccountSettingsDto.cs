using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyroo_api.Dtos
{
    public class AccountSettingsDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class AccountPasswordDto
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string PasswordConfirmation { get; set; }
    }

    public class AccountEmailDto
    {
        public string EmailAddress { get; set; }
    }

    public class AccountPhotoUrlDto
    {
        public string PhotoUrl { get; set; }
    }
}
