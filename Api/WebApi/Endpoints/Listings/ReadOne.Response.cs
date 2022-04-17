namespace Giveaway.WebApi.Endpoints.Listings;

public sealed record ReadOneResponse
{
    public ListingDetails Listing { get; init; } = null!;

    public OwnerInformation OwnerInfo { get; init; } = null!;

    public sealed record ListingDetails
    {
        public Guid Id { get; init; }

        public string Title { get; init; } = null!;

        public string Description { get; init; } = null!;

        public int Category { get; init; }

        public DateTime CreatedAt { get; init; }

        public IEnumerable<string> Images { get; init; } = null!;
    }

    public sealed record OwnerInformation
    {
        public string Email { get; init; } = null!;

        public string Name { get; init; } = null!;

        public string Image { get; init; } = null!;
    }
}
