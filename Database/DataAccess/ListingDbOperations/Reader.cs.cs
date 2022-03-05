using Giveaway.Application.Interfaces;
using Giveaway.Domain.Listings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.ReadListingById.Models.ListingReadModel;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Reader : IListingReader
{
    public Task<IEnumerable<ReadAllListingsModel>> ReadAllListings(CancellationToken cancellationToken) => throw new NotImplementedException();
    public Task<ReadListingByIdModel> ReadListingById(ListingId id, CancellationToken cancellationToken) => throw new NotImplementedException();
}
