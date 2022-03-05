using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.ReadAllListings.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Application.UseCases.ReadAllListings;
public sealed class Command
{
    private readonly IListingReader _reader;

    public Command(IListingReader reader) => _reader = reader;

    public async Task<IEnumerable<ListingReadModel>> ExecuteAsync(CancellationToken cancellationToken) =>
        await _reader.ReadAllListings(cancellationToken);
}
