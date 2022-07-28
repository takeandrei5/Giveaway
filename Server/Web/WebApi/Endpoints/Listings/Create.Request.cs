namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class CreateRequest
{
    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;

    public IEnumerable<string> Images { get; init; } = null!;

    public int Category { get; init; }
}
