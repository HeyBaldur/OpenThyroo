using System.ComponentModel.DataAnnotations;

namespace thyroo_api.Dtos
{
    public class UserSignInDto
    {
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
