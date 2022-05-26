using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using thyroo_api.Data;
using thyroo_api.Dtos;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IPostRepository _iPostRepository;
        private readonly IMapper _mapper;

        public PostController(
            IPostRepository iPostRepository,
            IMapper mapper,
            DataContext dataContext)
        {
            _iPostRepository = iPostRepository;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [HttpPost("create/{userId}")]
        public async Task<IActionResult> PublishPost(int userId, Post myPost)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            myPost.Created = DateTime.Now;
            myPost.UserId = userId;

            await _dataContext.Posts.AddAsync(myPost);
            if (await _iPostRepository.SaveAll())
                return Ok(myPost);

            return BadRequest();
        }

        [HttpGet("getPosts/{userId}/{pageNumber}")]
        public async Task<IActionResult> GetPosts(int userId, int pageNumber)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var posts = await _iPostRepository.GetAllPosts(pageNumber);
            var postsToReturn = _mapper.Map<IEnumerable<PostListDto>>(posts).OrderByDescending(p => p.Created);
            return Ok(postsToReturn);
        }

        [HttpGet("getPostsByCategory/{userId}/{pageNumber}/{categoryId}")]
        public async Task<IActionResult> GetPostsByCategory(int userId, int pageNumber, int categoryId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var posts = await _iPostRepository.GetAllPostsByCategory(pageNumber, categoryId);
            var postsToReturn = _mapper.Map<IEnumerable<PostListDto>>(posts).OrderByDescending(p => p.Created);
            return Ok(postsToReturn);
        }

        [HttpGet("getPostsByUserList/{userId}/{userToQuery}")]
        public async Task<IActionResult> GetPostsList(int userId, int userToQuery)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var posts = await _iPostRepository.GetAllPostsByUserList(userToQuery);
            var postsToReturn = _mapper.Map<IEnumerable<PostListDto>>(posts).OrderByDescending(p => p.Created);
            return Ok(postsToReturn);
        }

        [HttpGet("getSiglePost/{userId}/{postToQuery}")]
        public async Task<IActionResult> GetSinglePost(int userId, int postToQuery)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var post = await _iPostRepository.GetSinglePost(postToQuery);
            var postToReturn = _mapper.Map<PostListDto>(post);
            return Ok(postToReturn);
        }

        [HttpGet("getPostsByUser/{userId}/{pageNumber}/{profileId}")]
        public async Task<IActionResult> GetPostsByUser(int userId, int pageNumber, int profileId)
        {
            // Validate user auth
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Get all posts
            var posts = await _iPostRepository.GetAllPostsByUser(pageNumber, profileId);
            var postsToReturn = _mapper.Map<IEnumerable<PostListDto>>(posts);
            return Ok(postsToReturn);
        }

        /// <summary>
        /// TODO:
        /// comments and likes variables need to be declared in the logic of the
        /// code to get the full deletion, we need to investigate about it.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="postId"></param>
        /// <returns></returns>
        [HttpDelete("delete/{userId}/{postId}")]
        public async Task<IActionResult> DeletePost(int userId, int postId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var post = await _iPostRepository.GetPost(postId, userId);
            _ = await _iPostRepository.GetAllComments(post.Id);
            _ = await _iPostRepository.GetAllLikes(post.Id);

            if (post != null)
            {
                // Delete post
                _iPostRepository.Delete(post);
                await _iPostRepository.SaveAll();
                return Ok(true);
            }

            // Default value.
            return BadRequest(false);
        }

        [HttpPost("createComment/{userId}/{postId}")]
        public async Task<IActionResult> AddComment(int userId, int PostId, Comment comment)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            comment.UserId = userId;
            comment.Created = DateTime.Now;
            comment.PostId = PostId;

            await _dataContext.Comments.AddAsync(comment);

            if (await _iPostRepository.SaveAll())
                return Ok(comment);

            return BadRequest();
        }

        [HttpPost("createReply/{userId}/{commentId}")]
        public async Task<IActionResult> AddReply(int userId, int commentId, CommentsReply reply)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            reply.UserId = userId;
            reply.Created = DateTime.Now;
            reply.CommentId = commentId;

            await _dataContext.CommentsReplies.AddAsync(reply);

            if (await _iPostRepository.SaveAll())
                return Ok(reply);

            return BadRequest();
        }

        [HttpDelete("deleteComment/{userId}/{commentId}")]
        public async Task<IActionResult> DeleteComment(int userId, int commentId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Get post to delete
            var comment = await _iPostRepository.GetComment(commentId, userId);
            if (comment != null)
            {
                // Delete post
                _iPostRepository.Delete(comment);
                await _iPostRepository.SaveAll();
                return Ok(true);
            }

            // Default value.
            return BadRequest(false);
        }

        [HttpDelete("deleteReply/{userId}/{replyId}")]
        public async Task<IActionResult> DeleteReply(int userId, int replyId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Get post to delete
            var reply = await _iPostRepository.GetReply(replyId, userId);
            if (reply != null)
            {
                // Delete post
                _iPostRepository.Delete(reply);
                await _iPostRepository.SaveAll();
                return Ok(true);
            }

            // Default value.
            return BadRequest(false);
        }

        [HttpPost("like/{userId}/{postId}")]
        public async Task<IActionResult> Like(int userId, int postId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iPostRepository.LikePost(userId, postId);
            if (result != 0)
                return Ok(result);

            return BadRequest();
        }

        [HttpDelete("like/{userId}/{postId}")]
        public async Task<IActionResult> Unlike(int userId, int postId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var result = await _iPostRepository.UnlikePost(userId, postId);
            if (result != 0 || result == 0)
                return Ok(result);

            return BadRequest();
        }

        [AllowAnonymous]
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _iPostRepository.GetCategories();
            return Ok(categories);
        }

        [AllowAnonymous]
        [HttpGet("getCategoryInfo/{categoryId}")]
        public async Task<IActionResult> GetCategoryInfo(int categoryId)
        {
            var category = await _iPostRepository.GetCategory(categoryId);
            return Ok(category);
        }
    }
}