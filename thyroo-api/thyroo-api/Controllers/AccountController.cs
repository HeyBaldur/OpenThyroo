using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using thyroo_api.Dtos;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorize]
    [Route("api/[controller]/{userId}")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _iAccountRepository;
        private readonly IMapper _mapper;
        public AccountController(
            IAccountRepository iAccountRepository,
            IMapper mapper)
        {
            _iAccountRepository = iAccountRepository;
            _mapper = mapper;
        }

        [HttpPost("updateFullName")]
        public async Task<IActionResult> UpdateFullName(int userId, AccountSettingsDto accountSettingsDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iAccountRepository.UpdateAccountSettings(userId, accountSettingsDto);
            var resultToReturn = _mapper.Map<UserDetailsDto>(result);

            if (result != null)
                return Ok(resultToReturn);

            return BadRequest();
        }

        [HttpPost("updatePhotoUrl")]
        public async Task<IActionResult> UpdatePhotoUrl(int userId, AccountPhotoUrlDto accountPhotoUrlDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iAccountRepository.UpdateAccountPhotoUrl(userId, accountPhotoUrlDto);

            if (result)
                return Ok(accountPhotoUrlDto);

            return BadRequest();
        }

        [HttpPost("updateEmail")]
        public async Task<IActionResult> UpdateEmail(int userId, AccountEmailDto accountEmailDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iAccountRepository.UpdateAccountEmail(userId, accountEmailDto);

            if (result)
                return Ok(accountEmailDto);

            return BadRequest(new { 
                message = $"We are sorry the email {accountEmailDto.EmailAddress} is already in use."
            });
        }

        [HttpPost("updatePassword")]
        public async Task<IActionResult> UpdatePassword(int userId, AccountPasswordDto accountPasswordDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iAccountRepository.UpdateAccountPassword(userId, accountPasswordDto);

            if (result)
                return Ok(result);

            return BadRequest();
        }
    }
}