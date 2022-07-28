using Giveaway.Web.Application.Interfaces;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Giveaway.Web.Domain.Interfaces;
using Microsoft.OpenApi.Models;

namespace Giveaway.Web.WebApi.Extensions;

using ListingReader = Reader;
using ListingRepository = Repository;
using UserRepository = Database.DataAccess.UserDbOperations.Repository;

public static partial class ServicesExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        // Listings
        services.AddCreateListingUseCase();
        services.AddDeleteListingUseCase();
        services.AddReadAllListingsUseCase();
        services.AddReadListingByIdUseCase();
        services.AddUpdateListingUseCase();

        // Users
        services.AddCreateUserUseCase();
    }

    public static void AddReaders(this IServiceCollection services) =>
        services.AddScoped<IListingReader, ListingReader>();

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IListingRepository, ListingRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }

    public static void AddSwagger(this IServiceCollection services, string authority, string audience) =>
        services.AddSwaggerGen(swaggerGenOptions =>
        {
            swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo()
            {
                Title = "Giveaway APIs",
                Version = "v1"
            });

            swaggerGenOptions.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme()
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows()
                {
                    Implicit = new OpenApiOAuthFlow()
                    {
                        AuthorizationUrl = new Uri($"{ authority }authorize?audience={audience}"),
                        Scopes = new Dictionary<string, string> {
                            { "openid profile email", "Get required info from Auth0" },
                        },
                    }
                },
            });

            swaggerGenOptions.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "oauth2"
                        }
                    },
                    new List<string>
                    { "openid profile email" }
                }
            });

            swaggerGenOptions.CustomSchemaIds(t => t.FullName);
        });
}
