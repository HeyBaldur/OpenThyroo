using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Models;

namespace thyroo_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<UserAbout> UserAbout { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentsReply> CommentsReplies { get; set; }
        public DbSet<Likes> Like { get; set; }
        public DbSet<Followees> Followees { get; set; }
        public DbSet<Category> Categories { get; set; }


        // Business profile
        public DbSet<BusinessProfile> BusinessProfiles { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<ProfileTypes> ProfileTypes { get; set; }
        public DbSet<ProfileSubTypes> ProfileSubTypes { get; set; }
        public DbSet<BusinessTypes> BusinessTypes { get; set; }
        public DbSet<ProfileViewData> ProfileViewData { get; set; }

        // Business of interest
        public DbSet<BusinessInterests> BusinessInterests { get; set; }
        public DbSet<Match> Matches { get; set; }

        // Email strategy
        public DbSet<Models.Email> Emails { get; set; }
        public DbSet<Article> Articles { get; set; }

        // Notification strategy
        public DbSet<Notifications> Notifications { get; set; }

        // Ads
        public DbSet<AdsCampaign> AdsCampaigns { get; set; }
        public DbSet<AdsBasicModel> AdsBasicModels { get; set; }

    }
}
