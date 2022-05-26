using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _iAuth;
        private readonly IConfiguration _iConfiguration;
        private readonly IMapper _mapper;

        public AuthController(IAuth iAuth, IConfiguration iConfiguration, IMapper mapper)
        {
            _iAuth = iAuth;
            _iConfiguration = iConfiguration;
            _mapper = mapper;
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        /// <param name="userSignInDto"></param>
        /// <returns></returns>
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(UserSignInDto userSignInDto)
        {
            var userToSignIn = await _iAuth.Signin(userSignInDto.EmailAddress, userSignInDto.Password);
            if (userToSignIn == null)
                return Unauthorized(new
                {
                    error = $"We are sorry it seems {userSignInDto.EmailAddress} could not be found or password is not correct"
                });

            // Set claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userToSignIn.Id.ToString()),
                new Claim(ClaimTypes.Name, userToSignIn.EmailAddress)
            };

            // Set key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfiguration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserDetailsDto>(userToSignIn);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        /// <param name="userSignUpDto"></param>
        /// <returns></returns>
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(UserSignUpDto userSignUpDto)
        {
            // Check if the email exist
            if (await _iAuth.EmailExist(userSignUpDto.EmailAddress))
                return Unauthorized(new
                {
                    error = "The email address or username are already in use, please choose another one."
                });

            var newUser = new User
            {
                EnrollmentDate = DateTime.Now,
                EmailAddress = userSignUpDto.EmailAddress,
                FirstName = userSignUpDto.FirstName,
                LastName = userSignUpDto.LastName,
                Username = userSignUpDto.Username
            };

            // Create a new user with email address
            var createNewUser = await _iAuth.Signup(newUser, userSignUpDto.Password);

            // Confirm user has been added correctly
            if (createNewUser.EmailAddress == userSignUpDto.EmailAddress)
                return Ok(new
                {
                    User = createNewUser.EmailAddress,
                    Message = "User has been created successfully"
                });

            return BadRequest();
        }

        [HttpPost("authWithProvider")]
        public async Task<IActionResult> AuthenticationAsync(UserProviderAuthDto userProviderAuthDto)
        {
            // Authenticate user
            var userToAuthenticate = await _iAuth.ManageUser(userProviderAuthDto);

            // Set claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userToAuthenticate.Id.ToString()),
                new Claim(ClaimTypes.Name, userToAuthenticate.EmailAddress)
            };

            // Set key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfiguration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserDetailsDto>(userToAuthenticate);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

        [HttpPost("updateCurrentUser/{userId}")]
        public async Task<IActionResult> UpdateCurrentUser(int userId)
        {
            var userToUpdate = await _iAuth.UpdateLocalUser(userId);

            // Set claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userToUpdate.Id.ToString()),
                new Claim(ClaimTypes.Name, userToUpdate.EmailAddress)
            };

            // Set key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfiguration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserDetailsDto>(userToUpdate);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

        [AllowAnonymous]
        [HttpPost("forgotPassword/{email}")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var emailExists = await _iAuth.EmailExist(email);
            if (emailExists)
            {
                var setForgottenPassword = await _iAuth.CreateToken(email);
                if (setForgottenPassword)
                    return Ok(setForgottenPassword);
            }

            return NotFound();
        }

        [AllowAnonymous]
        [HttpPost("changePassword/{token}/{password}")]
        public async Task<IActionResult> ChangePassword(string token, string password)
        {
            // Run logic
            var lookUpUser = await _iAuth.UpdateUserState(token, password);
            if (lookUpUser)
                return Ok(lookUpUser);

            // Default value
            return BadRequest();
        }
    }
}