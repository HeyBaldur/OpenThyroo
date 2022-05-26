using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorize]
    [Route("api/[controller]/{userId}")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatchRepo _iMatchRepo;
        private readonly IMapper _mapper;
        public MatchController(
            IMatchRepo iMatchRepo,
            IMapper mapper)
        {
            _iMatchRepo = iMatchRepo;
            _mapper = mapper;
        }

        [HttpGet("validateMatch/{businessProfileId}/{targetBusinessProfileId}")]
        public async Task<IActionResult> ValidateMatch(int userId, int businessProfileId, int targetBusinessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var validationResult = await _iMatchRepo.MatchLogic(businessProfileId, targetBusinessProfileId);
            return Ok(validationResult);
        }

        [HttpPost("matchUser/{businessProfileId}/{targetBusinessProfileId}")]
        public async Task<IActionResult> MatchUser(int userId, int businessProfileId, int targetBusinessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var validationResult = await _iMatchRepo.SendMatch(userId, businessProfileId, targetBusinessProfileId);
            return Ok(validationResult);
        }

        [HttpPost("removeMatch/{businessProfileId}/{targetBusinessProfileId}")]
        public async Task<IActionResult> RemoveMatch(int userId, int businessProfileId, int targetBusinessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var validationResult = await _iMatchRepo.RemoveMatch(businessProfileId, targetBusinessProfileId);
            return Ok(validationResult);
        }
    }
}