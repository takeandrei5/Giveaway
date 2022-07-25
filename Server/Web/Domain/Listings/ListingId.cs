namespace Giveaway.Domain.Listings;

public sealed record ListingId
{
    public ListingId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("Listing id cannot be an empty Guid.");

        Value = value;
    }

    public Guid Value { get; init; }
}
