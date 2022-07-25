using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using Giveaway.Commons.Interfaces;
using Giveaway.Commons.Models;
using Giveaway.Commons.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

namespace Giveaway.Commons.Extensions;

public static class ServicesExtensions
{
    public static void AddApplicationServices(this IServiceCollection services) =>
        services.AddScoped<ILoggedUser, HttpContextLoggedUser>();
    
    public static void AddAutoMapperProfiles(this IServiceCollection services) =>
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    
    public static void AddAuthenticationAndAuthorization(this IServiceCollection serviceCollection, string domain,
        string audience)
    {
        serviceCollection.AddAuthorization(options =>
        {
            options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
            {
                policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                policy.RequireClaim(ClaimTypes.NameIdentifier);
            });
        });
        
        serviceCollection
           .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = audience;

                options.SaveToken = true;

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var currentIdentity = context.Principal!.Identities.First();

                        if (!currentIdentity.IsAuthenticated)
                            throw new InvalidOperationException("Current user is not authenticated.");

                        var accessToken = (JwtSecurityToken)context.SecurityToken;

                        var httpClient = new HttpClient
                        {
                            BaseAddress = new Uri(domain)
                        };

                        httpClient.DefaultRequestHeaders.Add(HeaderNames.Authorization,
                            $"Bearer {accessToken.RawData}");
                        httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");

                        var response = await httpClient.GetFromJsonAsync<UserInfo>("userinfo", CancellationToken.None);

                        if (response is null)
                            throw new InvalidOperationException("Failed fetching user information.");

                        currentIdentity.AddClaims(new Claim[]
                        {
                            new(ClaimTypes.Email, response.Email),
                            new(ClaimTypes.Name, response.Name),
                            new(ClaimTypes.Uri, response.Picture)
                        });
                    }
                };
            });
    }
}
