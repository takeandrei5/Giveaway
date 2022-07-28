using Giveaway.Commons.Exceptions;

namespace Giveaway.Web.Domain.Users;

public sealed record UserName
{
    internal UserName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("User name cannot be an empty name.");

        Value = value;
    }

    public string Value { get; }
}
