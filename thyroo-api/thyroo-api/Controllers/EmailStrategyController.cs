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
using thyroo_api.Email;
using thyroo_api.Helpers;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class EmailStrategyController : ControllerBase
    {
        private readonly IEmailStrategyRepo _repo;
        private readonly IMapper _mapper;
        private IEmailSender _emailSender;

        public EmailStrategyController(
            IEmailStrategyRepo repo,
            IMapper mapper,
            IEmailSender emailSender)
        {
            _repo = repo;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetEmail(id);

            // Validate if the message is not empty
            if (messageFromRepo == null)
                return NotFound("The message does not exists");

            return Ok(messageFromRepo);
        }

        [HttpPost("createMessage")]
        public async Task<IActionResult> CreateMessage(int userId, EmailForCreationDto messageForCreationDto)
        {
            // Set sender information
            var sender = await _repo.GetUser(userId);

            // Validate if user is authed
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Set sender id
            messageForCreationDto.SenderId = userId;
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            // Validate if recipient is not null
            if (recipient == null)
                return BadRequest("Could not find user");

            // Map message
            var message = _mapper.Map<Models.Email>(messageForCreationDto);
            _repo.Add(message);

            // Send an email notification
            var notificationResult = _emailSender.SendEmail(
                recipient.EmailAddress, $"{sender.ProviderFullName}");

            // Save the message into the DB
            if (await _repo.SaveAll())
            {
                var messageToReturn = _mapper.Map<EmailToReturnDto>(message);
                return CreatedAtRoute("GetMessage", new
                {
                    userId,
                    id = message.Id,
                    notRes = notificationResult
                }, messageToReturn);
            }

            throw new Exception("Creating the message failed on save");
        }

        [HttpPost("deleteMessage/{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetEmail(id);

            if (messageFromRepo.SenderId == userId)
                messageFromRepo.SenderDeleted = true;

            if (messageFromRepo.RecipientId == userId)
                messageFromRepo.RecipientDeleted = true;

            if (messageFromRepo.SenderDeleted && messageFromRepo.RecipientDeleted)
                _repo.Delete(messageFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error at deleting the message");
        }

        [HttpGet("getThread/{recipientId}")]
        public async Task<IActionResult> GetThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesFromRepo = await _repo.GetEmailsThread(userId, recipientId);

            var messageThread = _mapper.Map<IEnumerable<EmailToReturnDto>>(messagesFromRepo.OrderByDescending(p => p.MessageSent));

            return Ok(messageThread);
        }

        [HttpPost("markMessageAsRead/{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var email = await _repo.GetEmail(id);

            if (email.RecipientId != userId)
                return Unauthorized();

            email.Read = true;
            email.DateRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();
        }

        [HttpGet("getUser/{userToGet}")]
        public async Task<IActionResult> GetUser(int userId, int userToGet)
        {
            // Validate current logged user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Return user from repo
            var candidate = await _repo.GetUser(userToGet);

            // Map user to retreive required info
            var candidateToReturn = _mapper.Map<UserDetailsDto>(candidate);
            if (candidate == null)
                return BadRequest("We could not find your profile");

            // Return info
            return Ok(candidateToReturn);
        }


        [HttpGet("getMessagesForUser")]
        public async Task<IActionResult> GetMessagesForUser(int userId,
            [FromQuery] EmailParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;

            var messagesFromRepo = await _repo.GetEmailsForUser(messageParams);

            var messages = _mapper.Map<IEnumerable<EmailToReturnDto>>(messagesFromRepo);

            Response.AddPagination(
                messagesFromRepo.CurrentPage,
                messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount,
                messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("getNewMessages")]
        public async Task<IActionResult> GetNewMessages(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageNotifications = await _repo.GetNewMessages(userId);
            return Ok(messageNotifications);
        }
    }
}