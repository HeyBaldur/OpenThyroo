using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IAdsRepo
    {
        // Global strategy
        /// <summary>
        /// RULES
        /// Campaigns cannot be deleted
        /// Campaigns cannot be updated
        /// Ads can be deleted
        /// Ads cannot be updated
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        void Delete<T>(T entity) where T : class;

        // Campanigns strategy
        Task<bool> Add(AdsCampaign myCampaign);
        Task<bool> SaveAll();
        Task<IEnumerable<AdsCampaign>> GetMyCampaigns(int userId);
        Task<IEnumerable<AdsCampaign>> GetMyCampaignsToList(int userId);
        Task<AdsCampaign> GetCampaign(int campaignId);

        // Ads strategy
        Task<bool> AddAds(AdsBasicModel myAd);
        Task<IEnumerable<AdsBasicModel>> GetMyAds(int userId); // Only one ad per user for free
        Task<AdsBasicModel> GetAd(string occupation, string location);
        Task<bool> DeactivateAd(int userId, int adId);
    }
}
