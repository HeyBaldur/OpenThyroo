using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Helpers;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IEmailStrategyRepo
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Models.Email> GetEmail(int id);
        Task<PagedList<Models.Email>> GetEmailsForUser(EmailParams emailParams);
        Task<IEnumerable<Models.Email>> GetEmailsThread(int userId, int recipientId);
        Task<User> GetUser(int id);
        Task<int> GetNewMessages(int userId);
    }
}
