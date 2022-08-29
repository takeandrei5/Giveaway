namespace Giveaway.Commons.Errors;

public sealed class ForbiddenError : BaseError
{
    public ForbiddenError(string errorMessage) : base(403, errorMessage) { }

    public override string Title => "Forbidden error.";

    public override string Type => "https://tools.ietf.org/html/rfc7231#section-6.5.3";
}
