using System.Collections.Generic;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IBusinessProfile
    {
        Task<bool> Add(BusinessProfile businessProfile);
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<BusinessProfile> GetProfile(int userId);
        Task<bool> AddBusinessInterests(BusinessInterests businessInterests);
        Task<bool> DeleteBusinessInterests(int businessProfileId, int itemId);
        Task<IEnumerable<BusinessInterests>> GetUserBusinessInterests(int userId);
        Task<IEnumerable<BusinessTypes>> BusinessTypesList();
        Task<IEnumerable<ProfileTypes>> ProfileTypesList();
        Task<IEnumerable<ProfileSubTypes>> ProfileSubTypesList();
        Task<bool> AddView(ProfileViewData viewToAdd);
        Task<int> GetViewsCounter(int userId);
    }
}
