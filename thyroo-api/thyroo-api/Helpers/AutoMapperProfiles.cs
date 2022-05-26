using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyroo_api.Dtos;
using thyroo_api.Models;

namespace thyroo_api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDetailsDto>()
                .ForMember(dest => dest.BusinessId, options => options
                    .MapFrom(src => src.BusinessProfile.Id))
                .ForMember(dest => dest.Occupation, options => options
                    .MapFrom(src => src.BusinessProfile.Occupation))
                .ForMember(dest => dest.Location, options => options
                    .MapFrom(src => src.BusinessProfile.City));


            CreateMap<UserAbout, UserAboutDto>();


            CreateMap<User, PostUserDto>()
                .ForMember(dest => dest.BusinessId, options => options
                    .MapFrom(src => src.BusinessProfile.Id))
                .ForMember(dest => dest.Occupation, options => options
                    .MapFrom(src => src.BusinessProfile.Occupation))
                .ForMember(dest => dest.Location, options => options
                    .MapFrom(src => src.BusinessProfile.City));



            CreateMap<Comment, CommentsDto>().ReverseMap();
            CreateMap<CommentsReply, CommentsReplyDto>().ReverseMap();
            CreateMap<Likes, LikesDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Post, PostListDto>()
                .ForMember(dest => dest.Likes, options => options
                    .MapFrom(src => src.LikeDet.Count()));

            CreateMap<Article, ArticleDto>();
            CreateMap<Article, ArticleListDto>();


            CreateMap<Followees, FolloweeDto>();
            CreateMap<Followees, FollowerDto>();

            // Business Profile
            CreateMap<BusinessProfile, BusinessProfileDto>()
                .ForMember(dest => dest.PhotoUrl, options => options
                    .MapFrom(u => u.User.PhotoUrl)).ReverseMap();


            CreateMap<Match, MatchDto>().ReverseMap();

            CreateMap<BusinessInterests, BusinessInterestsDto>().ReverseMap();

            CreateMap<ProfileViewData, ProfileViewDataDto>().ReverseMap();
            CreateMap<Models.Email, EmailDto>();
            CreateMap<EmailForCreationDto, Models.Email>().ReverseMap();
            CreateMap<Models.Email, EmailToReturnDto>();

            // Notification strategy
            CreateMap<Notifications, NotificationsDto>();

            // Ads strategy
            CreateMap<AdsBasicModel, AdsBasicModelDto>().ReverseMap();
            CreateMap<AdsCampaign, AdsCampaignDto>().ReverseMap();
        }
    }
}
