namespace Giveaway.Domain.Users;

public sealed record UserName
{
    public UserName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("User name cannot be an empty name.");

        Value = value;
    }

    public string Value { get; init; }
}
