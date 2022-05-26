using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Helpers;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IAccountRepository
    {
        Task<User> UpdateAccountSettings(int userId, AccountSettingsDto accountSettingsDto);
        Task<bool> UpdateAccountPassword(int userId, AccountPasswordDto accountPasswordDto);
        Task<bool> UpdateAccountEmail(int userId, AccountEmailDto accountEmailDto);
        Task<bool> UpdateAccountPhotoUrl(int userId, AccountPhotoUrlDto accountPhotoUrlDto);
    }
}
