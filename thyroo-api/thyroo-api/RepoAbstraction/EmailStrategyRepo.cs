using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Helpers;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class EmailStrategyRepo : IEmailStrategyRepo
    {
        private readonly DataContext _dataContext;
        public EmailStrategyRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _dataContext.AddAsync(entity);
        }

        public async Task<PagedList<Models.Email>> GetEmailsForUser(EmailParams emailParams)
        {
            var emails = _dataContext.Emails
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .AsQueryable();

            switch (emailParams.MessageContainer)
            {
                case "Inbox":
                    emails = emails.Where(u => u.RecipientId == emailParams.UserId &&
                        u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    emails = emails.Where(u => u.SenderId == emailParams.UserId &&
                        u.SenderDeleted == false);
                    break;
                default:
                    emails = emails.Where(u => u.RecipientId == emailParams.UserId &&
                        u.RecipientDeleted == false && u.Read == false);
                    break;
            }

            emails = emails.OrderByDescending(d => d.MessageSent);
            return await PagedList<Models.Email>.CreateAsync(emails, emailParams.PageNumber, emailParams.PageSize);
        }

        public async Task<IEnumerable<Models.Email>> GetEmailsThread(int userId, int recipientId)
        {
            var emails = await _dataContext.Emails
                .Include(u => u.Sender).ThenInclude(b => b.BusinessProfile)
                .Include(u => u.Recipient).ThenInclude(b => b.BusinessProfile)
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId ||
                    m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

            return emails;
        }

        public async Task<Models.Email> GetEmail(int id)
        {
            return await _dataContext.Emails.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<int> GetNewMessages(int userId)
        {
            var emails = await _dataContext.Emails.Where(u => u.RecipientId == userId && u.Read == false).ToListAsync();
            if (emails == null)
                return 0;
            return emails.Count();
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(p => p.Id == id);
            return user;
        }

        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }
    }
}
