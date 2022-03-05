using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.UseCases.ReadListingById.Models;

namespace Giveaway.Application.UseCases.ReadAllListings.Models;

public sealed record ListingReadModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;
}
