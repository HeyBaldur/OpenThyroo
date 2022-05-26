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
using thyroo_api.Helpers;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorized]
    [Route("api/[controller]/{userId}")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IUserRepo _iUserRepo;
        private readonly IMapper _mapper;
        public UserController(
            DataContext dataContext,
            IUserRepo iUserRepo,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _iUserRepo = iUserRepo;
            _mapper = mapper;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers(int userId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Retreive users from repo
            var usersFromRepo = await _iUserRepo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<BusinessProfileDto>>(usersFromRepo);
            if (usersToReturn != null)
                return Ok(usersToReturn);

            // Default value
            return BadRequest();
        }

        [HttpGet("getUser/{userToQuery}")]
        public async Task<IActionResult> GetUser(int userId, int userToQuery)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Retreive users from repo
            var usersFromRepo = await _iUserRepo.GetUser(userToQuery);
            var usersToReturn = _mapper.Map<BusinessProfileDto>(usersFromRepo);
            if (usersToReturn != null)
                return Ok(usersToReturn);

            // Default value
            return NotFound();
        }

        [HttpGet("getUserByCriteria")]
        public async Task<IActionResult> GetUsersByCriteria(int userId, [FromQuery] UserParams userParams)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            userParams.UserId = userId;

            if (userParams.BusinessTypeId == 0)
            {
                userParams.BusinessTypeId = 1;
            }

            var usersFromRepo = await _iUserRepo.GetUsersByCriteria(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<BusinessInterestsDto>>(usersFromRepo);

            Response.AddPagination(
                usersFromRepo.CurrentPage,
                usersFromRepo.PageSize,
                usersFromRepo.TotalCount,
                usersFromRepo.TotalPages);

            if (usersToReturn != null)
                return Ok(usersToReturn);

            // Default value
            return NotFound();

        }

        [HttpGet("getUserByCriteriaName")]
        public async Task<IActionResult> GetUsersByCriteriaName(int userId, [FromQuery] UserParams userParams)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            userParams.UserId = userId;

            if (userParams.BusinessTypeId == 0)
            {
                userParams.BusinessTypeId = 1;
            }

            var usersFromRepo = await _iUserRepo.GetUsersByCriteriaFullName(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<BusinessInterestsDto>>(usersFromRepo);

            Response.AddPagination(
                usersFromRepo.CurrentPage,
                usersFromRepo.PageSize,
                usersFromRepo.TotalCount,
                usersFromRepo.TotalPages);

            if (usersToReturn != null)
                return Ok(usersToReturn);

            // Default value
            return NotFound();

        }

        [HttpGet("getLatest")]
        public async Task<IActionResult> GetLatest(int userId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var usersFromRepo = await _iUserRepo.GetLatest();
            var usersToReturn = _mapper.Map<IEnumerable<BusinessInterestsDto>>(usersFromRepo);
            if (usersToReturn != null)
                return Ok(usersToReturn);

            // Default value
            return NotFound();
        }
    }
}