using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Errors;

namespace Giveaway.Domain.Interfaces;

public interface IListingRepository
{
    Task CreateAsync(Listing listing, CancellationToken cancellationToken);

    Task<Result<Listing, NotFoundError>> FindListingByIdAsync(ListingId listingId, CancellationToken cancellationToken);
}
