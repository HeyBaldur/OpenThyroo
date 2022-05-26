using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class AccountRepository : IAccountRepository
    {
        private DataContext _dataContext { get; set; }
        public AccountRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<User> UpdateAccountSettings(int userId, AccountSettingsDto accountSettingsDto)
        {
            var userToUpdate = await _dataContext.Users.FirstOrDefaultAsync(p => p.Id == userId);
            userToUpdate.FirstName = accountSettingsDto.FirstName;
            userToUpdate.LastName = accountSettingsDto.LastName;
            userToUpdate.ProviderFullName = $"{accountSettingsDto.FirstName} {accountSettingsDto.LastName}";

            if (await _dataContext.SaveChangesAsync() > 0)
                return userToUpdate;

            return null;
        }

        public async Task<bool> UpdateAccountPassword(int userId, AccountPasswordDto accountPasswordDto)
        {
            // Get current user
            var userToUpdate = await _dataContext.Users.FirstOrDefaultAsync(p => p.Id == userId);

            // Validate if user was created by 3rd party
            if (userToUpdate.PasswordHash != null && userToUpdate.PasswordSalt != null)
            {
                // Password exists
                if (!VerifyPassword(accountPasswordDto.Password, userToUpdate.PasswordHash, userToUpdate.PasswordSalt))
                    return false;
            }

            // Create new password for user
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(accountPasswordDto.NewPassword, out passwordHash, out passwordSalt);
            userToUpdate.PasswordHash = passwordHash;
            userToUpdate.PasswordSalt = passwordSalt;

            // Return default value
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAccountEmail(int userId, AccountEmailDto accountEmailDto)
        {
            var userToUpdate = await _dataContext.Users.FirstOrDefaultAsync(p => p.Id == userId);
            if (await EmailExist(accountEmailDto.EmailAddress))
                return false;

            userToUpdate.EmailAddress = accountEmailDto.EmailAddress;

            // Default value
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> EmailExist(string emailAddress)
        {
            if (await _dataContext.Users.
                AnyAsync(x => x.EmailAddress == emailAddress))
                return true;
            return false;
        }

        public async Task<bool> UpdateAccountPhotoUrl(int userId, AccountPhotoUrlDto accountPhotoUrlDto)
        {
            var userToUpdate = await _dataContext.Users.FirstOrDefaultAsync(p => p.Id == userId);

            userToUpdate.PhotoUrl = accountPhotoUrlDto.PhotoUrl;

            // Default value
            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}
