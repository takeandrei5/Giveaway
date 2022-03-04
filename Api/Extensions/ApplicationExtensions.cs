namespace Giveaway.WebApi.Extensions;

public static partial class ApplicationExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        services.AddCreateListingUseCase();
    }
}
