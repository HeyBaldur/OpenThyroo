using Microsoft.Extensions.DependencyInjection;
using thyroo_api.services;

namespace thyroo_api.Email
{
    public static class SendGridExtentions
    {
        public static IServiceCollection AddSendGridEmailSender(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, SendGridEmailSender>();
            return services;
        }
    }
}
