using Giveaway.Application.Interfaces;
using Giveaway.Extensions;

namespace Giveaway.WebApi.Services;

public sealed class HttpContextLoggedUser : ILoggedUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextLoggedUser(IHttpContextAccessor httpContextAccessor) =>
        _httpContextAccessor = httpContextAccessor;

    public string GetEmailFromClaims() =>
        _httpContextAccessor.HttpContext!.User
            .GetEmail()
            .Match(email => email,
                () => throw new ArgumentException(
                    "Could not fetch email from claims."));

    public string GetFullNameFromClaims() =>
        _httpContextAccessor.HttpContext!.User
            .GetFullName()
            .Match(email => email,
                () => throw new ArgumentException(
                    "Could not fetch fullName from claims."));

    public string GetImageFromClaims() =>
        _httpContextAccessor.HttpContext!.User
            .GetImage()
            .Match(email => email,
                () => throw new ArgumentException(
                    "Could not fetch image from claims."));
}
