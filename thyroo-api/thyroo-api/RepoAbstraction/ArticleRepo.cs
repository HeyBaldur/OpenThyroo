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
    public class ArticleRepo : IArticleRepo
    {
        private readonly DataContext _dataContext;
        public ArticleRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<bool> Add<T>(T entity) where T : class
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public async Task<IEnumerable<Article>> GetActivity(int userId)
        {
            var article = await _dataContext.Articles
                .Include(p => p.User)
                .ToListAsync();
            return article.OrderByDescending(p => p.Created).Where(p => p.UserId == userId).Take(4);
        }

        public async Task<IEnumerable<Article>> GetAllArticlesByUser(int userId)
        {
            var article = await _dataContext.Articles
                .Include(p => p.User)
                .ToListAsync();
            return article.OrderByDescending(p => p.Created).Where(p => p.UserId == userId);
        }

        public async Task<Article> GetArticle(int Id)
        {
            var article = await _dataContext.Articles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == Id);
            if (article != null)
                return article;

            return null;
        }

        public async Task<Article> GetArticleByUser(int Id, int userId)
        {
            var article = await _dataContext.Articles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == Id && p.UserId == userId);
            if (article != null)
                return article;

            return null;
        }

        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}
