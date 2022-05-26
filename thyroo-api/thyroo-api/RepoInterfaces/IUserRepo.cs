using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Helpers;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IUserRepo
    {
        Task<IEnumerable<BusinessProfile>> GetUsers();
        Task<BusinessProfile> GetUser(int userId);
        Task<PagedList<BusinessInterests>> GetUsersByCriteria(UserParams userParams);
        Task<PagedList<BusinessInterests>> GetUsersByCriteriaFullName(UserParams userParams);
        Task<IEnumerable<BusinessInterests>> GetLatest();
    }
}
