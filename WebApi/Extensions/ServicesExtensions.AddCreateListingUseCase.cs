namespace Giveaway.WebApi.Extensions;

using CreateListingCommand = Application.UseCases.Listings.CreateListing.Command;
using DeleteListingCommand = Application.UseCases.Listings.DeleteListing.Command;

public partial class ServicesExtensions
{
    public static void AddCreateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<CreateListingCommand>();

    public static void AddDeleteListing(this IServiceCollection services) =>
        services.AddScoped<DeleteListingCommand>();
}
