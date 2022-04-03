using Giveaway.Application.UseCases.Listings.CreateListing;

namespace Giveaway.WebApi.Extensions;

public partial class ServicesExtensions
{
    public static void AddCreateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<Command>();
}
