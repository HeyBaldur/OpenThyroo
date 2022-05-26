using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace thyroo_api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    BannerPhoto = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    FlagUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProfileSubTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileSubTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProfileTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAbout",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Uid = table.Column<string>(nullable: true),
                    About = table.Column<string>(nullable: true),
                    LastUpdate = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAbout", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmailAddress = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    EnrollmentDate = table.Column<DateTime>(nullable: false),
                    LastActive = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleNmae = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    AccountBlocked = table.Column<bool>(nullable: false),
                    VerifiedAccount = table.Column<bool>(nullable: false),
                    Uid = table.Column<string>(nullable: true),
                    ProviderFullName = table.Column<string>(nullable: true),
                    BusinessId = table.Column<int>(nullable: false),
                    AllowSearchEngines = table.Column<bool>(nullable: false),
                    AllowUsersCommentYourPosts = table.Column<bool>(nullable: false),
                    AllowUsersCommentYourArticles = table.Column<bool>(nullable: false),
                    AllowUsersToMatchYou = table.Column<bool>(nullable: false),
                    AllowUsersTranslateYourActivity = table.Column<bool>(nullable: false),
                    MatchSession = table.Column<bool>(nullable: false),
                    SpaceInvites = table.Column<bool>(nullable: false),
                    Occupation = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    ForgotPassword = table.Column<bool>(nullable: false),
                    ForgotPasswordToken = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdsCampaigns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    AdName = table.Column<string>(nullable: true),
                    Spent = table.Column<int>(nullable: false),
                    KeyResults = table.Column<int>(nullable: false),
                    Clicks = table.Column<int>(nullable: false),
                    AverageCPM = table.Column<int>(nullable: false),
                    Starts = table.Column<DateTime>(nullable: false),
                    Ends = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsCampaigns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdsCampaigns_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Likes = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    PrivatePost = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Articles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BusinessProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    Occupation = table.Column<string>(nullable: true),
                    EmailContact = table.Column<string>(nullable: true),
                    PhoneContact = table.Column<string>(nullable: true),
                    EmailContactHidden = table.Column<bool>(nullable: false),
                    PhoneContactVisibleHidden = table.Column<bool>(nullable: false),
                    KnowAs = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    AvailableForId = table.Column<int>(nullable: false),
                    ExperienceYears = table.Column<int>(nullable: false),
                    SkillSet = table.Column<string>(nullable: true),
                    Accomplishments = table.Column<string>(nullable: true),
                    Legend = table.Column<string>(nullable: true),
                    CurrentlyActive = table.Column<bool>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Website = table.Column<string>(nullable: true),
                    ProfileVerified = table.Column<bool>(nullable: false),
                    CompanyName = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessProfiles_Countries_AvailableForId",
                        column: x => x.AvailableForId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BusinessProfiles_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BusinessProfiles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(nullable: true),
                    EmailBody = table.Column<string>(nullable: true),
                    Draft = table.Column<bool>(nullable: false),
                    Favorite = table.Column<bool>(nullable: false),
                    Read = table.Column<bool>(nullable: false),
                    MessageSent = table.Column<DateTime>(nullable: false),
                    DateRead = table.Column<DateTime>(nullable: true),
                    SenderDeleted = table.Column<bool>(nullable: false),
                    RecipientDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Emails_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Emails_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Followees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    FolloweeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Followees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Followees_Users_FolloweeId",
                        column: x => x.FolloweeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Followees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    NotificationDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Read = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Likes = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    PrivatePost = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Posts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "AdsBasicModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    AdsCampaignId = table.Column<int>(nullable: false),
                    Objective = table.Column<string>(nullable: true),
                    LocationId = table.Column<int>(nullable: false),
                    LocationName = table.Column<string>(nullable: true),
                    Starts = table.Column<DateTime>(nullable: false),
                    Ends = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    Audience = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    SponsoredBy = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Clicks = table.Column<int>(nullable: false),
                    Impressions = table.Column<int>(nullable: false),
                    Engagements = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdsBasicModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdsBasicModels_AdsCampaigns_AdsCampaignId",
                        column: x => x.AdsCampaignId,
                        principalTable: "AdsCampaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_AdsBasicModels_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BusinessInterests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessProfileId = table.Column<int>(nullable: false),
                    ProfileTypesId = table.Column<int>(nullable: false),
                    ProfileSubTypesId = table.Column<int>(nullable: false),
                    BusinessOfInterestId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessInterests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessInterests_BusinessTypes_BusinessOfInterestId",
                        column: x => x.BusinessOfInterestId,
                        principalTable: "BusinessTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BusinessInterests_BusinessProfiles_BusinessProfileId",
                        column: x => x.BusinessProfileId,
                        principalTable: "BusinessProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BusinessInterests_ProfileSubTypes_ProfileSubTypesId",
                        column: x => x.ProfileSubTypesId,
                        principalTable: "ProfileSubTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BusinessInterests_ProfileTypes_ProfileTypesId",
                        column: x => x.ProfileTypesId,
                        principalTable: "ProfileTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessProfileId = table.Column<int>(nullable: false),
                    TargetBusinessProfileId = table.Column<int>(nullable: false),
                    MatchDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_BusinessProfiles_BusinessProfileId",
                        column: x => x.BusinessProfileId,
                        principalTable: "BusinessProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Matches_BusinessProfiles_TargetBusinessProfileId",
                        column: x => x.TargetBusinessProfileId,
                        principalTable: "BusinessProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Matches_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ProfileViewData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessProfileId = table.Column<int>(nullable: false),
                    TargetBusinessProfileId = table.Column<int>(nullable: false),
                    Ip = table.Column<string>(nullable: true),
                    DateView = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileViewData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileViewData_BusinessProfiles_BusinessProfileId",
                        column: x => x.BusinessProfileId,
                        principalTable: "BusinessProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ProfileViewData_BusinessProfiles_TargetBusinessProfileId",
                        column: x => x.TargetBusinessProfileId,
                        principalTable: "BusinessProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    Likes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Comments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Like",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    PostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Like", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Like_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Like_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CommentsReplies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommentId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    Likes = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentsReplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentsReplies_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_CommentsReplies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdsBasicModels_AdsCampaignId",
                table: "AdsBasicModels",
                column: "AdsCampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_AdsBasicModels_UserId",
                table: "AdsBasicModels",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AdsCampaigns_UserId",
                table: "AdsCampaigns",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_UserId",
                table: "Articles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessInterests_BusinessOfInterestId",
                table: "BusinessInterests",
                column: "BusinessOfInterestId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessInterests_BusinessProfileId",
                table: "BusinessInterests",
                column: "BusinessProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessInterests_ProfileSubTypesId",
                table: "BusinessInterests",
                column: "ProfileSubTypesId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessInterests_ProfileTypesId",
                table: "BusinessInterests",
                column: "ProfileTypesId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessProfiles_AvailableForId",
                table: "BusinessProfiles",
                column: "AvailableForId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessProfiles_CountryId",
                table: "BusinessProfiles",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessProfiles_UserId",
                table: "BusinessProfiles",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentsReplies_CommentId",
                table: "CommentsReplies",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentsReplies_UserId",
                table: "CommentsReplies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Emails_RecipientId",
                table: "Emails",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Emails_SenderId",
                table: "Emails",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Followees_FolloweeId",
                table: "Followees",
                column: "FolloweeId");

            migrationBuilder.CreateIndex(
                name: "IX_Followees_UserId",
                table: "Followees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Like_PostId",
                table: "Like",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Like_UserId",
                table: "Like",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_BusinessProfileId",
                table: "Matches",
                column: "BusinessProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_TargetBusinessProfileId",
                table: "Matches",
                column: "TargetBusinessProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_UserId",
                table: "Matches",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_RecipientId",
                table: "Notifications",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CategoryId",
                table: "Posts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileViewData_BusinessProfileId",
                table: "ProfileViewData",
                column: "BusinessProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileViewData_TargetBusinessProfileId",
                table: "ProfileViewData",
                column: "TargetBusinessProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdsBasicModels");

            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "BusinessInterests");

            migrationBuilder.DropTable(
                name: "CommentsReplies");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "Followees");

            migrationBuilder.DropTable(
                name: "Like");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "ProfileViewData");

            migrationBuilder.DropTable(
                name: "UserAbout");

            migrationBuilder.DropTable(
                name: "AdsCampaigns");

            migrationBuilder.DropTable(
                name: "BusinessTypes");

            migrationBuilder.DropTable(
                name: "ProfileSubTypes");

            migrationBuilder.DropTable(
                name: "ProfileTypes");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "BusinessProfiles");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
