using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services.Recaptcha
{
    public interface IRecaptchaVerificationService
    {
        public Task<bool> VerifyRecaptchaAsync(string recaptchaToken);
    }
}
