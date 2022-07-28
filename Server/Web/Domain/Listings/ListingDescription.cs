namespace Giveaway.Web.Domain.Listings;

public sealed record ListingDescription
{
    public ListingDescription(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Listing description cannot be an empty description.");

        Value = value switch
        {
            { Length: < 5 } => throw new ArgumentException("Listing description cannot be shorter than 5 characters."),
            { Length: > 1000 } => throw new ArgumentException(
                "Listing description cannot be longer than 1000 characters."),
            _ => value
        };
    }

    public string Value { get; }
}
