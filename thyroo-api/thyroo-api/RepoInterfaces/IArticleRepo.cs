using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IArticleRepo
    {
        Task<bool> Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Article> GetArticle(int Id);
        Task<Article> GetArticleByUser(int Id, int userId); // This article is used for deleting and updating
        Task<IEnumerable<Article>> GetAllArticlesByUser(int userId);
        Task<IEnumerable<Article>> GetActivity(int userId);
    }
}
