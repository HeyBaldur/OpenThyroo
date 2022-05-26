using System;
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
    public class BusinessProfileController : ControllerBase
    {
        private readonly IBusinessProfile _iBusinessProfile;
        private readonly IMapper _mapper;
        public BusinessProfileController(
            IBusinessProfile iBusinessProfile,
            IMapper mapper)
        {
            _iBusinessProfile = iBusinessProfile;
            _mapper = mapper;
        }

        [HttpGet("getMyBusinessProfile")]
        public async Task<IActionResult> GetMyBusinessProfile(int userId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var profileFromRepo = await _iBusinessProfile.GetProfile(userId);

            // Validate if b profile exists
            var profileToReturn = _mapper.Map<BusinessProfile>(profileFromRepo);
            if (profileFromRepo != null)
            {
                return Ok(profileToReturn);
            }
            else
            {
                return NotFound(new {
                    message = "User has not added a business profile"
                });
            }
        }

        [HttpPost("addBusinessProfile")]
        public async Task<IActionResult> AddBusinessProfile(int userId, BusinessProfile businessProfile) 
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var profileFromRepo = await _iBusinessProfile.GetProfile(userId);
            if (profileFromRepo == null)
            {
                // Create new business profile
                businessProfile.UserId = userId;
                businessProfile.CountryId = 1; // This field has been removed from the FE
                await _iBusinessProfile.Add(businessProfile);
                await _iBusinessProfile.SaveAll();

                // Return values
                var profileToReturn = _mapper.Map<BusinessProfileDto>(businessProfile);
                return Ok(profileToReturn);
            }
            else
            {
                return BadRequest(new
                {
                    message = "User already has created a business profile"
                });
            }
        }

        [HttpPut("updateBusinessProfile")]
        public async Task<IActionResult> UpdateBusinessProfile(int userId, BusinessProfileDto businessProfileDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (businessProfileDto.UserId == userId)
            {
                var profileFromRepo = await _iBusinessProfile.GetProfile(userId);

                profileFromRepo.Summary = businessProfileDto.Summary;
                profileFromRepo.Occupation = businessProfileDto.Occupation;
                profileFromRepo.EmailContact = businessProfileDto.EmailContact;
                profileFromRepo.PhoneContact = businessProfileDto.PhoneContact;
                profileFromRepo.EmailContactHidden = businessProfileDto.EmailContactHidden;
                profileFromRepo.PhoneContactVisibleHidden = businessProfileDto.PhoneContactVisibleHidden;
                profileFromRepo.KnowAs = businessProfileDto.KnowAs;
                profileFromRepo.CountryId = businessProfileDto.CountryId;
                profileFromRepo.AvailableForId = businessProfileDto.AvailableForId;
                profileFromRepo.ExperienceYears = businessProfileDto.ExperienceYears;
                profileFromRepo.SkillSet = businessProfileDto.SkillSet;
                profileFromRepo.Accomplishments = businessProfileDto.Accomplishments;
                profileFromRepo.Legend = businessProfileDto.Legend;
                profileFromRepo.CurrentlyActive = businessProfileDto.CurrentlyActive;
                profileFromRepo.City = businessProfileDto.City;
                profileFromRepo.Address = businessProfileDto.Address;
                profileFromRepo.CompanyName = businessProfileDto.CompanyName;
                profileFromRepo.Website = businessProfileDto.Website;

                if (await _iBusinessProfile.SaveAll())
                {
                    var profileToReturn = _mapper.Map<BusinessProfileDto>(profileFromRepo);
                    return Ok(profileToReturn);
                }
            }

            // Default value
            return BadRequest();
        }

        [HttpGet("getBusinessInterests/{businessProfileId}")]
        public async Task<IActionResult> GetBusinessInterests(int userId, int businessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var interestsFromRepo = await _iBusinessProfile.GetUserBusinessInterests(businessProfileId);
            var interestsToReturn = _mapper.Map<IEnumerable<BusinessInterestsDto>>(interestsFromRepo);
            if (interestsFromRepo != null)
                return Ok(interestsToReturn);

            return NotFound();
        }

        [HttpGet("getBusinessInterestsByUser/{businessProfileId}")]
        public async Task<IActionResult> GetBusinessInterestsByUser(int userId, int businessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var interestsFromRepo = await _iBusinessProfile.GetUserBusinessInterests(businessProfileId);
            var interestsToReturn = _mapper.Map<IEnumerable<BusinessInterestsDto>>(interestsFromRepo);
            if (interestsFromRepo != null)
                return Ok(interestsToReturn);

            return NotFound();
        }

        [HttpPost("addBusinessInterests/{businessProfileId}")]
        public async Task<IActionResult> AddBusinessInterests(
            int userId,
            int businessProfileId,
            BusinessInterestsDto businessInterestsDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // User needs to have a business profile
            // before adding a business intersts
            var profileFromRepo = await _iBusinessProfile.GetProfile(userId);
            if (profileFromRepo == null)
                return BadRequest(new { 
                    message = $"User needs to have a business profile before adding a business intersts"
                });

            businessInterestsDto.BusinessProfileId = businessProfileId;
            var interestsToSave = _mapper.Map<BusinessInterests>(businessInterestsDto);
            var result = await _iBusinessProfile.AddBusinessInterests(interestsToSave);

            if (result == true)
                return Ok(businessInterestsDto);

            if (result == false)
                return BadRequest(new {
                    message = $"User cannot have more than 2 business interests"
                });

            return BadRequest();
        }

        [HttpDelete("deleteBusinessInterests/{itemId}/{businessProfileId}")]
        public async Task<IActionResult> DeleteBusinessInterests(int userId, int itemId, int businessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iBusinessProfile.DeleteBusinessInterests(businessProfileId, itemId);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpGet("getBusinessTypes")]
        public async Task<IActionResult> GetBusinesses()
        {
            var result = await _iBusinessProfile.BusinessTypesList();
            return Ok(result);
        }

        [HttpGet("getProfileTypes")]
        public async Task<IActionResult> GetProfileTypes()
        {
            var result = await _iBusinessProfile.ProfileTypesList();
            return Ok(result);
        }

        [HttpGet("getProfilesSubTypes")]
        public async Task<IActionResult> GetProfileSubTypes()
        {
            var result = await _iBusinessProfile.ProfileSubTypesList();
            return Ok(result);
        }

        [HttpPost("addView")]
        public async Task<IActionResult> AddView(int userId, ProfileViewDataDto viewToAdd)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            viewToAdd.DateView = DateTime.Now;
            var viewToSave = _mapper.Map<ProfileViewData>(viewToAdd);
            var result = await _iBusinessProfile.AddView(viewToSave);
            if (result) // View added 
                return Ok(true);

            if (!result) // View not added
                return Ok(false);

            return BadRequest();
        }

        [HttpGet("getViews/{businessProfileId}")]
        public async Task<IActionResult> GetViews(int userId, int businessProfileId)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iBusinessProfile.GetViewsCounter(businessProfileId);
            if (result != 0)
                return Ok(result);

            return BadRequest();
        }
    }
}