using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Listings;

namespace Giveaway.Application.UseCases.Listings.CreateListing;

public sealed record CommandFeed
{
    public ListingTitle Title { get; init; } = null!;

    public ListingDescription Description { get; init; } = null!;

    public IEnumerable<ListingImage> Images { get; init; } = Enumerable.Empty<ListingImage>();

    public Category Category { get; init; } = null!;
}
