namespace Giveaway.WebApi.Extensions;

using CreateListingCommand = Application.UseCases.Listings.CreateListing.Command;
using DeleteListingCommand = Application.UseCases.Listings.DeleteListing.Command;
using UpdateListingCommand = Application.UseCases.Listings.UpdateListing.Command;

public partial class ServicesExtensions
{
    public static void AddCreateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<CreateListingCommand>();

    public static void AddDeleteListingUseCase(this IServiceCollection services) =>
        services.AddScoped<DeleteListingCommand>();

    public static void AddUpdateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<UpdateListingCommand>();
}
