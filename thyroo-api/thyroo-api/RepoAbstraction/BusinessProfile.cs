using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class BusinessProfile : IBusinessProfile
    {
        private DataContext _dataContext { get; set; }
        public BusinessProfile(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<bool> Add(Models.BusinessProfile businessProfile)
        {
            await _dataContext.BusinessProfiles.AddAsync(businessProfile);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public async Task<Models.BusinessProfile> GetProfile(int userId)
        {
            var businessProfile = await _dataContext.BusinessProfiles
               .Include(c => c.Country)
               .Include(c => c.AvailableFor)
               .Include(c => c.User)
               .Where(u => u.UserId == userId).FirstOrDefaultAsync();

            return businessProfile;
        }

        public async Task<bool> AddBusinessInterests(BusinessInterests businessInterests)
        {
            var counter = _dataContext.BusinessInterests.Where(u => u.BusinessProfileId == businessInterests.BusinessProfileId).Count();
            if (counter < 2)
            {
                await _dataContext.BusinessInterests.AddAsync(businessInterests);
                return await _dataContext.SaveChangesAsync() > 0;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteBusinessInterests(int businessProfileId, int itemId)
        {
            var getItem = await _dataContext.BusinessInterests.SingleOrDefaultAsync(p => p.Id == itemId && p.BusinessProfileId == businessProfileId);
            _dataContext.BusinessInterests.Remove(getItem);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<BusinessInterests>> GetUserBusinessInterests(int userId)
        {
            var getInterests = await _dataContext.BusinessInterests
                .Include(t => t.ProfileSubTypes)
                .Include(t => t.ProfileTypes)
                .Include(t => t.BusinessOfInterest)
                .Where(p => p.BusinessProfileId == userId).ToListAsync();

            return getInterests;
        }

        public async Task<IEnumerable<BusinessTypes>> BusinessTypesList()
        {
            var businessTypes = await _dataContext.BusinessTypes.ToListAsync();
            return businessTypes;
        }

        public async Task<IEnumerable<ProfileTypes>> ProfileTypesList()
        {
            var profileTypes = await _dataContext.ProfileTypes.ToListAsync();
            return profileTypes;
        }

        public async Task<IEnumerable<ProfileSubTypes>> ProfileSubTypesList()
        {
            var businessSubTypes = await _dataContext.ProfileSubTypes.ToListAsync();
            return businessSubTypes;
        }

        public async Task<bool> AddView(ProfileViewData viewToAdd)
        {
            var viewRecord = await _dataContext.ProfileViewData
                .FirstOrDefaultAsync(
                p => p.BusinessProfileId == viewToAdd.BusinessProfileId && 
                p.TargetBusinessProfileId == viewToAdd.TargetBusinessProfileId &&
                p.Ip == viewToAdd.Ip);
            if (viewRecord != null)
            {
                return false;
            }
            else
            {
                await _dataContext.ProfileViewData.AddAsync(viewToAdd);
                await _dataContext.SaveChangesAsync();
                return true;
            }
        }

        public async Task<int> GetViewsCounter(int userId)
        {
            var counter = await _dataContext.ProfileViewData.Where(p => p.TargetBusinessProfileId == userId).CountAsync();
            return counter;
        }
    }
}
