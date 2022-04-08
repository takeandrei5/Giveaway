namespace Giveaway.WebApi.Endpoints.Listings;

public sealed record ReadOneResponse
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;

    public int Category { get; init; }

    public IEnumerable<string> Images { get; init; } = null!;
}
