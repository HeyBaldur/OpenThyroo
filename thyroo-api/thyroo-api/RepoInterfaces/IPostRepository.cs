using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.RepoInterfaces
{
    public interface IPostRepository
    {
        Task<bool> Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Post>> GetAllPosts(int pageNumber);
        Task<IEnumerable<Post>> GetAllPostsByUserList(int userToQuery); // It will only display 5 max
        Task<IEnumerable<Post>> GetAllPostsByUser(int userId, int pageNumber);
        Task<Post> GetSinglePost(int postId);
        Task<IEnumerable<Comment>> GetAllComments(int postId);
        Task<Post> GetPost(int Id, int userId);
        Task<Comment> GetComment(int Id, int userId);


        Task<IEnumerable<CommentsReply>> GetAllReplies(int commentId);
        Task<CommentsReply> GetReply(int Id, int userId);

        // Likes strategy
        Task<int> LikePost(int userId, int postId); // This method basically adds info to two columns
        Task<int> UnlikePost(int userId, int postId); // This method basically adds info to two columns
        Task<IEnumerable<Likes>> GetAllLikes(int postId);
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategory(int categoryId);
        Task<IEnumerable<Post>> GetAllPostsByCategory(int pageNumber, int categoryId);
    }
}
