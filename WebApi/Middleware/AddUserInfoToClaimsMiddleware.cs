using Giveaway.WebApi.Models;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;

namespace Giveaway.WebApi.Middleware;

public class AddUserInfoToClaimsMiddleware
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly RequestDelegate _next;

    public AddUserInfoToClaimsMiddleware(IHttpClientFactory httpClientFactory, RequestDelegate next)
    {
        _httpClientFactory = httpClientFactory;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        var httpClient = _httpClientFactory.CreateClient("Auth0");

        if (!httpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out var bearerToken))
        {
            throw new InvalidOperationException("Failed fetching bearer token.");
        }

        httpClient.DefaultRequestHeaders.Add(HeaderNames.Authorization, bearerToken[0]);

        var response = await httpClient.GetFromJsonAsync<UserInfoModel>("userinfo", CancellationToken.None);

        if (response == null)
        {
            throw new InvalidOperationException("Failed fetching user information.");
        }

        if (!httpContext.User.Identity!.IsAuthenticated)
        {
            throw new InvalidOperationException("Current user is not authenticated.");
        }

        httpContext.User.Identities
            .First()
            .AddClaims(new Claim[]
            {
                new(ClaimTypes.Email, response.Email),
                new(ClaimTypes.Name, response.Name),
                new(ClaimTypes.Uri, response.Picture)
            });

        await _next(httpContext);
    }
}
