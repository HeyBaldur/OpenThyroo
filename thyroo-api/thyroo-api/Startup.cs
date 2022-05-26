using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using thyroo_api.Data;
using thyroo_api.Helpers;
using Microsoft.OpenApi.Models;
using thyroo_api.RepoInterfaces;
using thyroo_api.RepoAbstraction;
using thyroo_api.Email;
using thyroo_api.services;

namespace thyroo_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // SendGrid implementation
            services.AddSendGridEmailSender();

            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionSQL")));
            // services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnectionMySQL")));
            services.AddControllers().AddNewtonsoftJson();
            services.AddControllers().AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = 
                Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddCors();
            services.AddAutoMapper(typeof(Startup));

            // Auto mapper config
            services.AddScoped<IAuth, Auth>();
            services.AddScoped<IBusinessProfile, BusinessProfile>();
            services.AddScoped<IGlobalRepository, GlobalRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<IMatchRepo, MatchRepo>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IEmailStrategyRepo, EmailStrategyRepo>();
            services.AddScoped<IArticleRepo, ArticleRepo>();
            // services.AddScoped<IEmailSender, SendGridEmailSender>();
            services.AddScoped<INotificationsRepo, NotificationsRepo>();
            services.AddScoped<IAdsRepo, AdsRepo>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Thyroo API", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            #region Swagger configuation
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Thyroo api V1");
            });
            #endregion

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // endpoints.MapFallbackToController("Index", "FallBack");
            });
        }
    }
}
