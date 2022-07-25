using Giveaway.Web.Application.UseCases.Listings.CreateListing;

namespace Giveaway.Web.WebApi.Extensions;

using CreateListingCommand = Command;
using DeleteListingCommand = Application.UseCases.Listings.DeleteListing.Command;
using ReadAllListingCommand = Application.UseCases.Listings.ReadAllListings.Command;
using ReadListingByIdCommand = Application.UseCases.Listings.ReadListingById.Command;
using UpdateListingCommand = Application.UseCases.Listings.UpdateListing.Command;

public static partial class ServicesExtensions
{
    public static void AddCreateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<CreateListingCommand>();

    public static void AddDeleteListingUseCase(this IServiceCollection services) =>
        services.AddScoped<DeleteListingCommand>();

    public static void AddReadAllListingsUseCase(this IServiceCollection services) =>
        services.AddScoped<ReadAllListingCommand>();

    public static void AddReadListingByIdUseCase(this IServiceCollection services) =>
        services.AddScoped<ReadListingByIdCommand>();

    public static void AddUpdateListingUseCase(this IServiceCollection services) =>
        services.AddScoped<UpdateListingCommand>();
}
