using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface INotificationsRepo
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task<bool> Add(Notifications notification);

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        void Delete<T>(T entity) where T : class;

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<bool> SaveAll();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<IEnumerable<Notifications>> GetNotifications(int userId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<bool> ReadNotification(int id, int userId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<Notifications> GetNotification(int id, int userId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> GetNotificationCounter(int userId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        Task<IEnumerable<ProfileViewData>> GetWhoViewedMyProfile(int profileId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<bool> MarkAllAsRead(int userId);
    }
}
