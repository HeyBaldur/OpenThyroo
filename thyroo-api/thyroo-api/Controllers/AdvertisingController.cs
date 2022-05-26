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
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorized]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisingController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IAdsRepo _iAdsRepo;
        private readonly IMapper _mapper;
        private object article;

        public AdvertisingController(
            IAdsRepo iAdsRepo,
            IMapper mapper,
            DataContext dataContext)
        {
            _iAdsRepo = iAdsRepo;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [HttpPost("addCampaign/{userId}")]
        public async Task<IActionResult> AddCampaign(int userId, AdsCampaign adsCampaign)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Set main values
            adsCampaign.UserId = userId;
            adsCampaign.Starts = DateTime.Now;

            // Add campaign to DB
            var result = await _iAdsRepo.Add(adsCampaign);
            var campaignToReturn = _mapper.Map<AdsCampaignDto>(adsCampaign);

            // Validate results
            if (result)
                return Ok(campaignToReturn);

            // Default return
            return BadRequest();
        }

        [HttpGet("getCampaigns/{userId}")]
        public async Task<IActionResult> GetCampaigns(int userId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add campaign to DB
            var result = await _iAdsRepo.GetMyCampaigns(userId);
            var campaignsToReturn = _mapper.Map<IEnumerable<AdsCampaignDto>>(result);

            // Validate results
            if (result == null)
                return NotFound();

            if(result != null)
                return Ok(campaignsToReturn);

            // Default return
            return BadRequest();
        }

        [HttpGet("getCampaignsToList/{userId}")]
        public async Task<IActionResult> GetCampaignsToList(int userId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add campaign to DB
            var result = await _iAdsRepo.GetMyCampaignsToList(userId);
            var campaignsToReturn = _mapper.Map<IEnumerable<AdsCampaignDto>>(result);

            // Validate results
            if (result == null)
                return NotFound();

            if (result != null)
                return Ok(campaignsToReturn);

            // Default return
            return BadRequest();
        }

        [HttpPost("addAd/{userId}")]
        public async Task<IActionResult> AddAd(int userId, AdsBasicModel myAdd)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Get current campaign
            var campaign = await _iAdsRepo.GetCampaign(myAdd.AdsCampaignId);

            // Add campaign to DB
            myAdd.UserId = userId;
            myAdd.Starts = DateTime.Now;
            myAdd.Ends = campaign.Ends;

            // Get results
            var result = await _iAdsRepo.AddAds(myAdd);
            var adToReturn = _mapper.Map<AdsBasicModelDto>(myAdd);

            // Validate results
            if (result)
                return Ok(adToReturn);

            // Default return
            return BadRequest();
        }

        [HttpPost("deactivateAd/{userId}/{adId}")]
        public async Task<IActionResult> DeactivateAd(int userId, int adId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            // Get and update ad
            var ad = await _iAdsRepo.DeactivateAd(userId, adId);

            // Default value.
            return Ok(ad);
        }

        [HttpGet("getMyAds/{userId}")]
        public async Task<IActionResult> GetMyAds(int userId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add campaign to DB
            var result = await _iAdsRepo.GetMyAds(userId);
            var adsToReturn = _mapper.Map<IEnumerable<AdsBasicModelDto>>(result);

            // Validate results
            if (result == null)
                return NotFound();

            if (result != null)
                return Ok(adsToReturn);

            // Default return
            return BadRequest();
        }

        [HttpGet("getAds/{userId}/{occupation}/{location}")]
        public async Task<IActionResult> GetAds(int userId, string occupation, string location)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add campaign to DB
            var result = await _iAdsRepo.GetAd(occupation, location);
            var adToReturn = _mapper.Map<AdsBasicModelDto>(result);

            // Validate results
            if (result == null)
                return NotFound();

            if (result != null)
                return Ok(adToReturn);

            // Default return
            return BadRequest();
        }
    }
}