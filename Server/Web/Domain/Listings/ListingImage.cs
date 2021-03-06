using System.Text.RegularExpressions;
using Giveaway.Commons.Exceptions;

namespace Giveaway.Web.Domain.Listings;

public sealed record ListingImage
{
    private static readonly Regex _urlRegex = new(
        @"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)",
        RegexOptions.Compiled | RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));

    public ListingImage(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("Listing image cannot be an empty url.");

        if (!_urlRegex.IsMatch(value))
            throw new DomainRuleException("Listing image cannot be an invalid url.");

        Value = value;
    }

    public string Value { get; }
}
