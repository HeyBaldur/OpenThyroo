using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IGlobalRepository
    {
        Task<IEnumerable<Country>> GetCountries();
        Task<BusinessTypes> GetBusinessTypes();
        Task<ProfileTypes> GetProfileTypes();
        Task<ProfileSubTypes> GetProfileSubTypes();
        ValidateBusinessRequirementsDto ValidateBusinessProfile(int userId, int businessProfileId);
        Task<IEnumerable<Match>> GetMatches(int userId);
        Task<IEnumerable<User>> GetLatestUsers();
    }
}
