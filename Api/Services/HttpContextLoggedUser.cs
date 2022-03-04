using Giveaway.Application.Interfaces;
using Giveaway.Extensions;

namespace Giveaway.WebApi.Services;

public sealed class HttpContextLoggedUser : ILoggedUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextLoggedUser(IHttpContextAccessor httpContextAccessor) =>
        _httpContextAccessor = httpContextAccessor;

    public string GetEmailFromToken()
    {
        var httpContext = _httpContextAccessor.HttpContext;

        if (httpContext is null) throw new InvalidOperationException("HttpContextAccessor cannot be null.");

        return httpContext.User
            .GetEmail()
            .Match(email => email,
                () => throw new ArgumentException(
                    "The logged user's email does not match with the email from claims principal."));
    }
}
