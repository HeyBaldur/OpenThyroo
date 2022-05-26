using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IAuth
    {
        Task<User> Signup(User user, string password);
        Task<User> Signin(string emailAddress, string password);
        Task<bool> EmailExist(string emailAddress);
        Task<User> ManageUser(UserProviderAuthDto user);
        Task<User> UpdateLocalUser(int userId);
        Task<bool> CreateToken(string emailAddress);
        Task<bool> UpdateUserState(string token, string password);
    }
}
