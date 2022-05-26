using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Email;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class Auth : IAuth
    {
        private DataContext _dataContext { get; set; }
        private static readonly Random random = new Random();
        private IEmailSender _emailSender;
        public Auth(
            DataContext dataContext,
            IEmailSender emailSender)
        {
            _dataContext = dataContext;
            _emailSender = emailSender;
        }

        public async Task<bool> EmailExist(string emailAddress)
        {
            if (await _dataContext.Users.
                AnyAsync(x => x.EmailAddress == emailAddress))
                return true;
            return false;
        }

        public async Task<User> Signin(string emailAddress, string password)
        {
            // Retreive the user
            var user = await _dataContext.Users
                .Include(b => b.BusinessProfile)
                .Where(u => u.EmailAddress == emailAddress).FirstOrDefaultAsync();
            if (user == null)
                return null;

            // Validate the password
            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // Return the user
            return user;
        }

        public async Task<User> Signup(User user, string password)
        {
            // Sign a new user up
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PhotoUrl = "DEFAULT_PHOTO_URL";
            user.ProviderFullName = $"{user.FirstName} {user.LastName}";
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add the new user
            await _dataContext.Users.AddAsync(user);

            // Save the new user
            await _dataContext.SaveChangesAsync();

            // Return the user
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
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

        public async Task<User> ManageUser(UserProviderAuthDto user)
        {
            var userToVerify = await _dataContext.Users
                .Include(b => b.BusinessProfile)
                .Where(x => x.Uid == user.Uid).FirstOrDefaultAsync();
            if (userToVerify == null)
            {
                // Add new user in case it does not exist
                User userToAdd = new User();
                userToAdd.Uid = user.Uid;
                userToAdd.PhotoUrl = user.PhotoUrl;
                userToAdd.ProviderFullName = user.ProviderFullName;
                userToAdd.EmailAddress = user.Email;
                userToAdd.EnrollmentDate = DateTime.Now;
                userToAdd.LastActive = DateTime.Now;
                await _dataContext.Users.AddAsync(userToAdd);
                await _dataContext.SaveChangesAsync();

                // Return user added
                return userToAdd;
            }
            else
            {
                // Update the last active user
                userToVerify.LastActive = DateTime.Now;
                userToVerify.PhotoUrl = user.PhotoUrl;
                await _dataContext.SaveChangesAsync();

                // Return verified user
                return userToVerify;
            }
        }

        public async Task<User> UpdateLocalUser(int userId)
        {
            // Retreive the user
            var user = await _dataContext.Users
                .Include(b => b.BusinessProfile)
                .Where(u => u.Id == userId).FirstOrDefaultAsync();

            // Return the user
            return user;
        }

        public async Task<bool> CreateToken(string emailAddress)
        {
            // Create token
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string token = new string(Enumerable.Repeat(chars, 17).Select(s => s[random.Next(s.Length)]).ToArray());

            // Find the user
            var findUser = await _dataContext.Users.Where(u => u.EmailAddress == emailAddress).FirstOrDefaultAsync();

            // Update user
            findUser.ForgotPassword = true;
            findUser.ForgotPasswordToken = token;

            // Save results
            var result = (await _dataContext.SaveChangesAsync() > 0);

            var notificationResult = _emailSender.PasswordReset(emailAddress, token);

            // Return result
            if (result && notificationResult)
                return true;

            // Return result
            return false;
        }

        public async Task<bool> UpdateUserState(string token, string password)
        {
            var user = await _dataContext.Users.Where(t => t.ForgotPasswordToken == token).FirstOrDefaultAsync();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.ForgotPassword = false;
            user.ForgotPasswordToken = null;

            return (await _dataContext.SaveChangesAsync() > 0);
        }
    }
}
