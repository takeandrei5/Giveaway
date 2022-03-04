using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Listings;

namespace Giveaway.Domain.Interfaces;

public interface IListingRepository
{
    Task<Result<string>> CreateAsync(Listing listing, CancellationToken cancellationToken);
}
