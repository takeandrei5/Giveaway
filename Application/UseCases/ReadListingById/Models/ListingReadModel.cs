using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.UseCases.ReadListingById.Models;

namespace Giveaway.Application.UseCases.ReadListingById.Models;

public sealed record ListingReadModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;

    public string Category { get; init; } = null!;

    public IEnumerable<Image> Images { get; init; } = Enumerable.Empty<Image>();

    public sealed record Image
    {
        public string Url { get; init; } = null!;
    }
}
