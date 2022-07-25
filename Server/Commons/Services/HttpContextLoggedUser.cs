using Giveaway.Commons.Extensions;
using Giveaway.Commons.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Giveaway.Commons.Services;

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

    public string GetNameFromClaims() =>
        _httpContextAccessor.HttpContext!.User
            .GetName()
            .Match(email => email,
                () => throw new ArgumentException(
                    "Could not fetch name from claims."));

    public string GetImageFromClaims() =>
        _httpContextAccessor.HttpContext!.User
            .GetImage()
            .Match(email => email,
                () => throw new ArgumentException(
                    "Could not fetch image from claims."));
}
