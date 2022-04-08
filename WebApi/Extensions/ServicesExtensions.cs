using Giveaway.Application.Interfaces;
using Giveaway.Domain.Interfaces;
using Giveaway.WebApi.Services;
using Microsoft.OpenApi.Models;

namespace Giveaway.WebApi.Extensions;

using ListingReader = Database.DataAccess.ListingDbOperations.Reader;
using ListingRepository = Database.DataAccess.ListingDbOperations.Repository;
using UserRepository = Database.DataAccess.UserDbOperations.Repository;

public static partial class ServicesExtensions
{
    public static void AddApplicationServices(this IServiceCollection services) =>
        services.AddScoped<ILoggedUser, HttpContextLoggedUser>();

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

    public static void AddAutoMapperProfiles(this IServiceCollection services) =>
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

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

            //swaggerGenOptions.OperationFilter<SecurityRequirementsOperationFilter>();

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
