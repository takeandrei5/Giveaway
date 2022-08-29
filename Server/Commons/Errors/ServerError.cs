namespace Giveaway.Commons.Errors;

public sealed class ServerError : BaseError
{
    public ServerError(string errorMessage) : base(500, errorMessage) { }

    public override string Title => "Server error.";

    public override string Type => "https://tools.ietf.org/html/rfc7231#section-6.6.1";
}
