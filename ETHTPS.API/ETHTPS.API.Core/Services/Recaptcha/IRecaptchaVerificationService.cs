using System.Threading.Tasks;

namespace ETHTPS.API.Core.Infrastructure.Services.Recaptcha
{
    public interface IRecaptchaVerificationService
    {
        public Task<bool> VerifyRecaptchaAsync(string recaptchaToken);
    }
}
