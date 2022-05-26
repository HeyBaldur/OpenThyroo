using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Data;
using thyroo_api.Models;
using thyroo_api.RepoInterfaces;

namespace thyroo_api.RepoAbstraction
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _dataContext;
        public PostRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<bool> Add<T>(T entity) where T : class
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public async Task<IEnumerable<Comment>> GetAllComments(int postId)
        {
            var comments = await _dataContext.Comments.Where(p => p.PostId == postId).ToListAsync();
            return comments;
        }

        public async Task<IEnumerable<Post>> GetAllPosts(int pageNumber)
        {
            pageNumber *= 10;

            var posts = await _dataContext.Posts
               .Include(c => c.Comments).ThenInclude(u => u.User)
               .Include(c => c.Comments).ThenInclude(u => u.CommentsReplies).ThenInclude(u => u.User)
               .Include(c => c.Category)
               .Include(p => p.User)
               .Include(p => p.User.BusinessProfile)
               .Include(l => l.LikeDet)
               .ToListAsync();

            return posts.OrderByDescending(p => p.Created).Take(pageNumber);
        }

        public async Task<IEnumerable<Post>> GetAllPostsByCategory(int pageNumber, int categoryId)
        {
            pageNumber *= 10;

            var posts = await _dataContext.Posts
               .Include(c => c.Comments).ThenInclude(u => u.User)
               .Include(c => c.Comments).ThenInclude(u => u.CommentsReplies).ThenInclude(u => u.User)
               .Include(c => c.Category)
               .Include(p => p.User)
               .Include(p => p.User.BusinessProfile)
               .Include(l => l.LikeDet)
               .ToListAsync();
            var postsToReturn = posts
                .OrderByDescending(p => p.Created)
                .Where(c => c.CategoryId == categoryId)
                .Take(pageNumber);
            return postsToReturn;
        }

        public async Task<IEnumerable<Post>> GetAllPostsByUser(int pageNumber, int profileId)
        {
            pageNumber *= 10;
            var posts = await _dataContext.Posts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Where(p => p.UserId == profileId)
                .Take(pageNumber)
                .OrderByDescending(p => p.Created)
                .ToListAsync();
            return posts;
        }

        public async Task<Post> GetSinglePost(int postId)
        {
            var post = await _dataContext.Posts
                .Include(c => c.Comments).ThenInclude(p => p.User)
                .Include(c => c.Comments).ThenInclude(u => u.CommentsReplies).ThenInclude(u => u.User)
                .Include(c => c.Category)
                .Include(p => p.User)
                .Include(l => l.LikeDet)
                .FirstOrDefaultAsync(p => p.Id == postId);
            if (post != null)
                return post;

            return null;
        }

        public async Task<IEnumerable<Post>> GetAllPostsByUserList(int userToQuery)
        {
            var posts = await _dataContext.Posts
                .Include(p => p.User)
                .Include(p => p.Category)
                .Where(p => p.UserId == userToQuery)
                .Take(5)
                .OrderByDescending(d => d.Created)
                .ToListAsync();
            return posts;
        }

        public async Task<Comment> GetComment(int id, int userId)
        {
            var comment = await _dataContext.Comments.Where(p => p.Id == id && p.UserId == userId).SingleOrDefaultAsync();
            if (comment != null)
                return comment;

            return null;
        }

        public async Task<Post> GetPost(int id, int userId)
        {
            var post = await _dataContext.Posts.Where(p => p.Id == id && p.UserId == userId).SingleOrDefaultAsync();
            if (post != null)
                return post;

            return null;
        }

        public async Task<int> LikePost(int userId, int postId)
        {
            // TODO: What's the difference between FirstOrDefault and First and Default
            // Get post information
            var postInfo = await _dataContext.Posts.Where(p => p.Id == postId).FirstOrDefaultAsync();

            // Validate if the post contains likes from current user
            var postLiked = await _dataContext.Like.Where(l => l.UserId == userId && l.PostId == postId).FirstOrDefaultAsync();
            if (postLiked != null)
                return postInfo.Likes;

            // Add a new record
            Likes like = new Likes();
            like.UserId = userId;
            like.PostId = postId;
            var result = await _dataContext.Like.AddAsync(like);

            // Update current value
            postInfo.Likes += 1;

            // Save changes in the database
            await _dataContext.SaveChangesAsync();

            // Return final result to controller
            return postInfo.Likes;
        }

        public async Task<int> UnlikePost(int userId, int postId)
        {
            // Get post information
            var postInfo = await _dataContext.Posts.Where(p => p.Id == postId).FirstOrDefaultAsync();

            // Validate if the post contains likes from current user
            var postLiked = await _dataContext.Like.Where(l => l.UserId == userId && l.PostId == postInfo.Id).FirstOrDefaultAsync();
            if (postLiked != null)
            {
                // Remove post from likes list
                _dataContext.Like.Remove(postLiked);

                // Update current value
                if (postInfo.Likes != 0)
                    postInfo.Likes -= 1;
            }

            // Save changes in the database
            await _dataContext.SaveChangesAsync();

            // Return final result to controller
            return postInfo.Likes;
        }

        public async Task<bool> SaveAll()
        {
            return (await _dataContext.SaveChangesAsync() > 0);
        }

        public async Task<IEnumerable<Likes>> GetAllLikes(int postId)
        {
            var likes = await _dataContext.Like.Where(p => p.PostId == postId).ToListAsync();
            return likes;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _dataContext.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category> GetCategory(int categoryId)
        {
            var category = await _dataContext.Categories.Where(c => c.Id == categoryId).FirstOrDefaultAsync();
            return category;
        }

        public async Task<IEnumerable<CommentsReply>> GetAllReplies(int commentId)
        {
            var replies = await _dataContext.CommentsReplies.Where(p => p.CommentId == commentId).ToListAsync();
            return replies;
        }

        public async Task<CommentsReply> GetReply(int Id, int userId)
        {
            var reply = await _dataContext.CommentsReplies.Where(p => p.Id == Id && p.UserId == userId).SingleOrDefaultAsync();
            if (reply != null)
                return reply;

            return null;
        }
    }
}
