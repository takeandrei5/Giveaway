using Giveaway.Commons.Exceptions;

namespace Giveaway.Web.Domain.Listings;

public sealed record ListingTitle
{
    public ListingTitle(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("Listing title cannot be an empty title.");

        Value = value.Length switch
        {
            < 5 => throw new DomainRuleException("Listing title cannot be shorter than 5 characters."),
            > 50 => throw new DomainRuleException("Listing title cannot be longer than 50 characters."),
            _ => value
        };
    }

    public string Value { get; }
}
