using System;
using thyroo_api.Email;
using SendGrid;
using SendGrid.Helpers.Mail;
using Newtonsoft.Json;

namespace thyroo_api.services
{
    public class SendGridEmailSender : IEmailSender
    {
        public bool SendEmail(string email, string name)
        {
            var sendGridClient = new SendGridClient("YOUR_SEND_GRID_KEY");

            var sendGridMessage = new SendGridMessage();
            sendGridMessage.SetFrom("EMAIL", "NAME");
            sendGridMessage.AddTo(email, "Notification");
            sendGridMessage.SetTemplateId("TEMPLATE_ID");
            sendGridMessage.SetTemplateData(new HelloEmail
            {
                Name = name,
                Url = "https://www.domain.com"
            });

            var response = sendGridClient.SendEmailAsync(sendGridMessage).Result;
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                Console.WriteLine("Email sent");
                return true;
            }

            return false;
        }

        public bool PasswordReset(string email, string token)
        {
            var sendGridClient = new SendGridClient("CLIENT_ID");

            var sendGridMessage = new SendGridMessage();
            sendGridMessage.SetFrom("EMAIL", "Thyroo");
            sendGridMessage.AddTo(email, "Notification");
            sendGridMessage.SetTemplateId("TEMPLATE_ID");
            sendGridMessage.SetTemplateData(new HelloEmail
            {
                Token = token,
                Url = "https://www.domain.com"
            });

            var response = sendGridClient.SendEmailAsync(sendGridMessage).Result;
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                Console.WriteLine("Email sent");
                return true;
            }

            return false;
        }

        private class HelloEmail
        {
            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("token")]
            public string Token { get; set; }

            [JsonProperty("url")]
            public string Url { get; set; }
        }
    }
}
