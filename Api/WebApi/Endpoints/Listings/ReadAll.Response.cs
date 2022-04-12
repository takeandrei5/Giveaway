using Giveaway.Commons.Extra.Pagination;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed record ReadAllResponse
{
    public PaginatedResult<Listing> Listings { get; init; } = null!;

    public sealed record Listing
    {
        public Guid Id { get; init; }

        public string Title { get; init; } = null!;

        public string Description { get; init; } = null!;

        public string MainImageUrl { get; init; } = null!;

        public DateTime CreatedAt { get; init; }
    }
}
