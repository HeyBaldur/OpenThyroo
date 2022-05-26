using System.Threading.Tasks;

namespace thyroo_api.Email
{
    public interface IEmailSender
    {
        bool SendEmail(string email, string name);
        bool PasswordReset(string email, string token);
    }
}
