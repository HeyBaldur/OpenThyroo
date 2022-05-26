using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Helpers;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class UserRepo : IUserRepo
    {
        private DataContext _dbContext { get; set; }
        public UserRepo(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<Models.BusinessProfile>> GetUsers()
        {
            var users = await _dbContext.BusinessProfiles
                .Distinct()
                .Include(u => u.User)
                .Include(c => c.Country)
                .Include(c => c.AvailableFor)
                .OrderByDescending(d => d.User.EnrollmentDate)
                .ToListAsync();
            return users;
        }

        public async Task<Models.BusinessProfile> GetUser(int userId)
        {
            var user = await _dbContext.BusinessProfiles
                .Include(u => u.User)
                .Include(c => c.Country)
                .Include(c => c.AvailableFor)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            return user;
        }

        public async Task<PagedList<Models.BusinessInterests>> GetUsersByCriteria(UserParams userParams)
        {
            var users = _dbContext.BusinessInterests
                .Include(u => u.BusinessProfile)
                .Include(u => u.BusinessProfile.User)
                .Include(b => b.BusinessOfInterest)
                .Include(p => p.ProfileTypes)
                .Include(p => p.ProfileSubTypes)
                .Include(p => p.BusinessProfile.Country)
                .OrderByDescending(d => d.BusinessProfile.User.EnrollmentDate)
                .AsQueryable();

            if (userParams.ProfileTypeId != 0)
            {
                users = users.Where(
                p => p.BusinessOfInterestId == userParams.BusinessTypeId &&
                p.ProfileTypesId == userParams.ProfileTypeId &&
                p.ProfileSubTypesId == userParams.ProfileSubTypeId);
            }

            // Validate only title
            if (userParams.Title != null)
            {
                users = users.Where(b => b.BusinessProfile.Occupation.Contains(userParams.Title));
            }

            // Validate title and country
            if (userParams.Title != null && userParams.CountryId != 0)
            {
                users = users
                    .Where(
                        b => b.BusinessProfile.Occupation.Contains(userParams.Title) &&
                        b.BusinessProfile.CountryId == userParams.CountryId);
            }

            // Validate city
            if (userParams.City != null)
            {
                users = users.Where(b => b.BusinessProfile.City.Contains(userParams.City));
            }

            users = users.Where(u => u.BusinessProfile.UserId != userParams.UserId);

            return await PagedList<BusinessInterests>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<IEnumerable<BusinessInterests>> GetLatest()
        {
            var users = await _dbContext.BusinessInterests
                .Include(u => u.BusinessProfile)
                .Include(u => u.BusinessProfile.User)
                .Include(b => b.BusinessOfInterest)
                .Include(p => p.ProfileTypes)
                .Include(p => p.ProfileSubTypes)
                .Include(p => p.BusinessProfile.Country)
                .Take(10)
                .ToListAsync();

            return users;
        }

        public async Task<PagedList<BusinessInterests>> GetUsersByCriteriaFullName(UserParams userParams)
        {
            var users = _dbContext.BusinessInterests
                .Include(u => u.BusinessProfile)
                .Include(u => u.BusinessProfile.User)
                .Include(b => b.BusinessOfInterest)
                .Include(p => p.ProfileTypes)
                .Include(p => p.ProfileSubTypes)
                .Include(p => p.BusinessProfile.Country)
                .OrderByDescending(d => d.BusinessProfile.User.EnrollmentDate)
                .AsQueryable();

            users = users
                    .Where(
                        b => b.BusinessProfile.Occupation.Contains(userParams.Title) &&
                        b.BusinessProfile.CountryId == userParams.CountryId || b.BusinessProfile.KnowAs.Contains(userParams.Name));

            users = users.Where(u => u.BusinessProfile.UserId != userParams.UserId);

            return await PagedList<BusinessInterests>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }
    }
}
