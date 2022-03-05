using Giveaway.Domain.Listings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.ReadListingById.Models.ListingReadModel;

namespace Giveaway.Application.Interfaces;
public interface IListingReader
{
    Task<IEnumerable<ReadAllListingsModel>> ReadAllListings(CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingById(ListingId id, CancellationToken cancellationToken);
}
