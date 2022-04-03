using Giveaway.Domain.Listings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingReadModel;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

namespace Giveaway.Application.Interfaces;
public interface IListingReader
{
    Task<IEnumerable<ReadAllListingsModel>> ReadAllListings(CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingById(ListingId id, CancellationToken cancellationToken);
}
