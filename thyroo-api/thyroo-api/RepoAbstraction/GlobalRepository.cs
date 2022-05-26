using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class GlobalRepository : IGlobalRepository
    {
        private DataContext _dataContext { get; set; }
        public GlobalRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Task<BusinessTypes> GetBusinessTypes()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Country>> GetCountries()
        {
            var countries = await _dataContext.Countries.ToListAsync();
            return countries;
        }

        public Task<ProfileSubTypes> GetProfileSubTypes()
        {
            throw new NotImplementedException();
        }

        public Task<ProfileTypes> GetProfileTypes()
        {
            throw new NotImplementedException();
        }

        public ValidateBusinessRequirementsDto ValidateBusinessProfile(int userId, int businessProfileId)
        {
            ValidateBusinessRequirementsDto dataToReturn = new ValidateBusinessRequirementsDto();
            var profile = _dataContext.BusinessProfiles.Where(u => u.UserId == userId).FirstOrDefault();
            var preferences = _dataContext.BusinessInterests.Where(u => u.BusinessProfileId == businessProfileId).Count();

            dataToReturn.BusinessProfile = (profile == null) ? false : true;
            dataToReturn.BusinessInterests = (preferences != 0) ? true : false;

            return dataToReturn;
        }

        public async Task<IEnumerable<Match>> GetMatches(int userId)
        {
            var query = await (from businessUser in _dataContext.Matches.Where(p => p.BusinessProfileId == userId).Include(u => u.BusinessProfile.User)
                               join targetBusinessUser in _dataContext.Matches.Where(p => p.TargetBusinessProfileId == userId)
                                .Include(u => u.BusinessProfile).ThenInclude(u => u.User)
                                   on businessUser.TargetBusinessProfileId equals targetBusinessUser.BusinessProfileId
                               select new Match {
                                   Id = businessUser.Id,
                                   BusinessProfile = (targetBusinessUser.BusinessProfile),
                                   BusinessProfileId = userId,
                                   TargetBusinessProfile = targetBusinessUser.TargetBusinessProfile,
                                   MatchDate = businessUser.MatchDate,
                                   User = targetBusinessUser.User
                               })
                               .Distinct()
                               .ToListAsync();
            return query;
        }

        public async Task<IEnumerable<User>> GetLatestUsers()
        {
            var users = await _dataContext
                .Users.Include(p => p.BusinessProfile)
                .OrderByDescending(p => p.EnrollmentDate)
                .Take(8)
                .ToListAsync();
            return users;
        }
    }
}
