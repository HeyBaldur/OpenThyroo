using thyroo_api.Models;

namespace thyroo_api.Dtos
{
    public class BusinessProfileDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Summary { get; set; }
        public string Occupation { get; set; }
        public string EmailContact { get; set; }
        public string PhoneContact { get; set; }
        public bool EmailContactHidden { get; set; }
        public bool PhoneContactVisibleHidden { get; set; }
        public string KnowAs { get; set; }
        public Country Country { get; set; }
        public int CountryId { get; set; }
        public Country AvailableFor { get; set; }
        public int AvailableForId { get; set; }
        public int ExperienceYears { get; set; }
        public string SkillSet { get; set; }
        public string Accomplishments { get; set; }
        public string Legend { get; set; }
        public bool CurrentlyActive { get; set; }
        public string PhotoUrl { get; set; }
        public string Website { get; set; }
        public bool ProfileVerified { get; set; }
        public string CompanyName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
    }
}
