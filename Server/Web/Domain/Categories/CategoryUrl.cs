using Giveaway.Commons.Exceptions;

namespace Giveaway.Web.Domain.Categories;

public sealed record CategoryUrl
{
    internal CategoryUrl(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("Category url cannot be an empty url.");

        Value = value;
    }

    public string Value { get; }
}
