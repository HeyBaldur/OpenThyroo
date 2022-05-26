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
    public class NotificationsRepo : INotificationsRepo
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly DataContext _dataContext;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataContext"></param>
        public NotificationsRepo(
            DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<bool> Add(Notifications notification)
        {
            await _dataContext.Notifications.AddAsync(notification);
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Notifications>> GetNotifications(int userId)
        {
            var notifications = await _dataContext.Notifications
                .Include(p => p.User)
                .Where(p => p.RecipientId == userId && p.Read == false)
                .OrderByDescending(p => p.NotificationDate)
                .ToListAsync();
            return notifications;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<bool> ReadNotification(int id, int userId)
        {
            var notification = await _dataContext.Notifications
                .FirstOrDefaultAsync(p => p.Id == id && p.RecipientId == userId);
            notification.Read = true;

            return (await _dataContext.SaveChangesAsync() > 0);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<Notifications> GetNotification(int id, int userId)
        {
            var notifications = await _dataContext.Notifications
                .FirstOrDefaultAsync(p => p.RecipientId == userId);
            return notifications;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<int> GetNotificationCounter(int userId)
        {
            var notifications = await _dataContext.Notifications
                .Where(p => p.RecipientId == userId && p.Read == false).CountAsync();
            return notifications;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ProfileViewData>> GetWhoViewedMyProfile(int profileId)
        {
            // Get information
            var people = await _dataContext.ProfileViewData
                .Where(p => p.TargetBusinessProfileId == profileId)
                .Include(p => p.BusinessProfile)
                .Include(u => u.BusinessProfile.User)
                .OrderByDescending(p => p.DateView)
                .Take(10)
                .ToListAsync();

            // Return object
            return people;
        }

        public async Task<bool> MarkAllAsRead(int userId)
        {
            // Get all notifications
            var notifications = await _dataContext.Notifications
                .Where(p => p.RecipientId == userId && p.Read == false).ToListAsync();

            // Remove all notifications
            _dataContext.RemoveRange(notifications);

            // Save db
            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}
