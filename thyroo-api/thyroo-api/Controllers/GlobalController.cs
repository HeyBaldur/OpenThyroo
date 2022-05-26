using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GlobalController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IGlobalRepository _iGlobalRepository;
        private readonly IMapper _mapper;

        public GlobalController(
            IGlobalRepository iGlobalRepository,
            IMapper mapper,
            DataContext dataContext)
        {
            _iGlobalRepository = iGlobalRepository;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [HttpGet("getCountries")]
        public async Task<IActionResult> GetCountries()
        {
            var countries = await _iGlobalRepository.GetCountries();
            return Ok(countries);
        }


        [HttpGet("validateUser/{userId}/{businessProfileId}")]
        public IActionResult ValidateUser(int userId, int businessProfileId)
        {
            var result = _iGlobalRepository.ValidateBusinessProfile(userId, businessProfileId);
            return Ok(result);
        }

        [HttpGet("getMyMatches/{userId}/{businessId}")]
        public async Task<IActionResult> GetMyMatches(int userId, int businessId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iGlobalRepository.GetMatches(businessId);
            var resultToReturn = _mapper.Map<IEnumerable<MatchDto>>(result);

            if (resultToReturn == null)
                return null;

            // Default value to return
            return Ok(resultToReturn);
        }

        [HttpGet("tryConnection/{userId}")]
        public IActionResult TryConnection(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            return Ok(true);
        }

        [HttpGet("getLatestUsers/{userId}")]
        public async Task<IActionResult> GetLatestUsersAsync(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var users = await _iGlobalRepository.GetLatestUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserDetailsDto>>(users);

            if (usersToReturn == null)
                return NotFound();

            return Ok(usersToReturn);
        }
    }
}