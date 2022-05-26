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
    public class ArticlesController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IArticleRepo _iArticleRepo;
        private readonly IMapper _mapper;

        public ArticlesController(
            IArticleRepo iPostRepository,
            IMapper mapper,
            DataContext dataContext)
        {
            _iArticleRepo = iPostRepository;
            _mapper = mapper;
            _dataContext = dataContext;
        }

        [HttpPost("postArticle/{userId}")]
        public async Task<IActionResult> PostArticle(int userId, Article article)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var articleWeight = System.Text.ASCIIEncoding.Unicode.GetByteCount(article.Description);

            if (articleWeight > 1000000)
                return BadRequest();

            article.Created = DateTime.Now;
            article.UserId = userId;
            article.PrivatePost = false;
            article.PhotoUrl = null;
            article.Likes = 0;

            await _dataContext.Articles.AddAsync(article);
            if (await _iArticleRepo.SaveAll())
                return Ok(article);

            return BadRequest();
        }

        [HttpGet("getSigleArticle/{userId}/{postToQuery}")]
        public async Task<IActionResult> GetSigleArticle(int userId, int postToQuery)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var article = await _iArticleRepo.GetArticle(postToQuery);
            var articleToReturn = _mapper.Map<ArticleDto>(article);
            return Ok(articleToReturn);
        }

        [HttpGet("getArticlesByUser/{userId}")]
        public async Task<IActionResult> GetArticles(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var articles = await _iArticleRepo.GetAllArticlesByUser(userId);
            var articlesToReturn = _mapper.Map<IEnumerable<ArticleListDto>>(articles).OrderByDescending(p => p.Created);
            return Ok(articlesToReturn);
        }

        [HttpGet("getActivity/{userId}")]
        public async Task<IActionResult> GetActivity(int userId)
        {
            var articles = await _iArticleRepo.GetActivity(userId);
            var articlesToReturn = _mapper.Map<IEnumerable<ArticleListDto>>(articles).OrderByDescending(p => p.Created);
            return Ok(articlesToReturn);
        }

        [HttpDelete("deleteArticle/{userId}/{articleId}")]
        public async Task<IActionResult> DeleteArticle(int userId, int articleId)
        {
            // Validate user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var article = await _iArticleRepo.GetArticleByUser(articleId, userId);

            if (article != null)
            {
                // Delete post
                _iArticleRepo.Delete(article);
                await _iArticleRepo.SaveAll();
                return Ok(true);
            }

            // Default value.
            return BadRequest(false);
        }

        [HttpPut("updateArticle/{userId}")]
        public async Task<IActionResult> UpdateArticle(int userId, ArticleToUpdateDto articleToUpdateDto)
        {
            // Validate current user
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var articleWeight = System.Text.ASCIIEncoding.Unicode.GetByteCount(articleToUpdateDto.Description);

            if (articleWeight > 1000000)
                return BadRequest();

            if (articleToUpdateDto.UserId == userId)
            {
                var articleFromRepo = await _iArticleRepo.GetArticle(articleToUpdateDto.Id);

                articleFromRepo.Title = articleToUpdateDto.Title;
                articleFromRepo.Description = articleToUpdateDto.Description;
                

                if (await _iArticleRepo.SaveAll())
                {
                    var profileToReturn = _mapper.Map<ArticleDto>(articleFromRepo);
                    return Ok(profileToReturn);
                }
            }

            // Default value
            return BadRequest();
        }
    }
}