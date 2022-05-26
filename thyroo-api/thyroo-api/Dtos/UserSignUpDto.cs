using System.ComponentModel.DataAnnotations;

namespace thyroo_api.Dtos
{
    public class UserSignUpDto
    {
        [Required]
        public string EmailAddress { get; set; }
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
