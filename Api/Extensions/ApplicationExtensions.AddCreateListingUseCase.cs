using Giveaway.Application.UseCases.CreateListing;

namespace Giveaway.WebApi.Extensions;

public partial class ApplicationExtensions
{
    public static void AddCreateListingUseCase(this IServiceCollection services)
    {
        services.AddScoped<Command>();
    }
}
