namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string? Reason { get; set; }
        public ValidationResult(bool valid, string reason = null)
        {
            IsValid = valid;
            Reason = reason;
        }
        public static ValidationResult Valid => new(true);
        public static ValidationResult InvalidFor(string reason) => new(false, reason);
    }
}
