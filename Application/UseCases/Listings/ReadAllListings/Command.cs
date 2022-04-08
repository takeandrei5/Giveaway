using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;

namespace Giveaway.Application.UseCases.Listings.ReadAllListings;
public sealed class Command
{
    private readonly IListingReader _reader;

    public Command(IListingReader reader) => _reader = reader;

    public async Task<IEnumerable<ListingDtoModel>> ExecuteAsync(CancellationToken cancellationToken) =>
        await _reader.ReadAllListingsAsync(cancellationToken);
}
