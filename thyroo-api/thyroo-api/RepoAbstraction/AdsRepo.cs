using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class AdsRepo : IAdsRepo
    {
        private readonly DataContext _dataContext;
        public AdsRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<bool> Add(AdsCampaign myCampaign)
        {
            await _dataContext.AdsCampaigns.AddAsync(myCampaign);
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public async Task<bool> AddAds(AdsBasicModel myAd)
        {
            await _dataContext.AdsBasicModels.AddAsync(myAd);
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public async Task<bool> DeactivateAd(int userId, int adId)
        {
            var ad = await _dataContext.AdsBasicModels.FirstOrDefaultAsync(p => p.Id == adId && p.UserId == userId);
            ad.Active = (ad.Active == true) ? false : true;
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public async Task<AdsBasicModel> GetAd(string occupation, string location)
        {
            var qry = from row in _dataContext.AdsBasicModels
                      where row.Audience.Contains(occupation) && row.LocationName.Contains(location)
                      select row;

            int count = qry.Count();
            int index = new Random().Next(count);

            AdsBasicModel cust = await qry.Skip(index).Take(1).SingleOrDefaultAsync();

            //var adToDisplay = await _dataContext.AdsBasicModels
            //    .Where(p => p.Audience.Contains(occupation) && p.LocationName.Contains(location) && p.Active == true)
            //    .OrderBy(x => Guid.NewGuid())
            //    .Skip(1)
            //    .Take(1)
            //    .SingleOrDefaultAsync();
            return cust;
        }

        public async Task<AdsCampaign> GetCampaign(int campaignId)
        {
            var campaign = await _dataContext.AdsCampaigns
                .FirstOrDefaultAsync(p => p.Id == campaignId);
            return campaign;
        }

        public async Task<IEnumerable<AdsBasicModel>> GetMyAds(int userId)
        {
            var myAds = await _dataContext.AdsBasicModels
                .Where(u => u.UserId == userId)
                .Include(p => p.User)
                .Include(p => p.AdsCampaign)
                .ToListAsync();
            return myAds;
        }

        public async Task<IEnumerable<AdsCampaign>> GetMyCampaigns(int userId)
        {
            var myAds = await _dataContext.AdsCampaigns
                .Where(u => u.UserId == userId)
                .Include(p => p.User)
                .ToListAsync();
            return myAds;
        }

        public async Task<IEnumerable<AdsCampaign>> GetMyCampaignsToList(int userId)
        {
            var myAds = await _dataContext.AdsCampaigns
                .Where(u => u.UserId == userId)
                .ToListAsync();
            return myAds;
        }

        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}
