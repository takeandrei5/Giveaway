using AutoMapper;
using System.Reflection;

namespace Giveaway.WebApi.Extensions;

public static partial class ApplicationExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        services.AddCreateListingUseCase();
    }

    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }
}
