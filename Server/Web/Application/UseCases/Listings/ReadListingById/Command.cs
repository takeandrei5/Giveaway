using Giveaway.Commons.Errors;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using Giveaway.Web.Application.Interfaces;
using Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Application.UseCases.Listings.ReadListingById;
public sealed class Command
{
    private readonly IListingReader _listingReader;
    private readonly IListingRepository _listingRepository;

    public Command(IListingReader listingReader, IListingRepository listingRepository)
    {
        _listingReader = listingReader;
        _listingRepository = listingRepository;
    }

    public async Task<Result<ListingDtoModel, NotFoundError>> ExecuteAsync(ListingId id, CancellationToken cancellationToken)
    {
        var listingResult = await _listingRepository.FindListingByIdAsync(id, cancellationToken);

        return await listingResult.SelectManyAsync(
            async listing =>
            {
                var listingReadModel = await _listingReader.ReadListingByIdAsync(listing.Id, cancellationToken);
                return listingReadModel.AsSuccess<ListingDtoModel, NotFoundError>();
            });
    }
}
