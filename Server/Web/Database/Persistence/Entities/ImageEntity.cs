namespace Giveaway.Web.Database.Persistence.Entities;

public sealed record ImageEntity
{
    public Guid Id { get; set; }

    public Guid ListingId { get; set; }

    public ListingEntity Listing { get; set; } = null!;

    public string Url { get; set; } = null!;

    public int Index { get; set; }
}
