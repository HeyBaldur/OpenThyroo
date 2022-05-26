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
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorize]
    [Route("api/[controller]/{userId}")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationsRepo _repo;
        private readonly IMapper _mapper;
        // private IEmailSender _emailSender;

        public NotificationController(
            INotificationsRepo repo,
            IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("addNotification")]
        public async Task<IActionResult> AddNotification(int userId, Notifications notification)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add notification
            var result = await _repo.Add(notification);

            return Ok(result);
        }

        [HttpPost("readNotification/{notificationId}")]
        public async Task<IActionResult> ReadNotification(int userId, int notificationId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add notification
            var result = await _repo.ReadNotification(notificationId, userId);

            return Ok(result);
        }

        [HttpDelete("deleteNotification/{notificationId}")]
        public async Task<IActionResult> DeleteNotification(int userId, int notificationId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var notification = await _repo.GetNotification(notificationId, userId);
            _repo.Delete(notification);
            var result = await _repo.SaveAll();

            return Ok(result);
        }

        [HttpGet("getNotifications")]
        public async Task<IActionResult> GetNotification(int userId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var notifications = await _repo.GetNotifications(userId);
            var notificationsToReturn = _mapper.Map<IEnumerable<NotificationsDto>>(notifications);

            return Ok(notificationsToReturn);
        }

        [HttpGet("getNotificationsCounter")]
        public async Task<IActionResult> GetNotificationsCounter(int userId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var notifications = await _repo.GetNotificationCounter(userId);

            // It only returns a number
            return Ok(notifications);
        }

        [HttpGet("whoViewedMyProfile/{businessProfileId}")]
        public async Task<IActionResult> WhoViewedMyProfile(int userId, int businessProfileId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var people = await _repo.GetWhoViewedMyProfile(businessProfileId);
            var peopleToReturn = _mapper.Map<IEnumerable<ProfileViewDataDto>>(people);

            if (peopleToReturn == null)
                return NotFound();

            return Ok(peopleToReturn);
        }

        [HttpPost("markAllAsRead")]
        public async Task<IActionResult> ReadAll(int userId)
        {
            // Validate if user is authed
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Add notification
            var result = await _repo.MarkAllAsRead(userId);

            return Ok(result);
        }
    }
}