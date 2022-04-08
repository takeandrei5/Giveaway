namespace Giveaway.Domain.Errors;

public sealed class ForbiddenError : BaseError
{
    internal ForbiddenError(string errorMessage) : base(403, errorMessage) { }

    public override string Title { get; init; } = "Forbidden error.";

    public override string Type { get; init; } = "https://tools.ietf.org/html/rfc7231#section-6.5.3";
}
