namespace Giveaway.Web.Domain.Users;

public sealed record UserId
{
    internal UserId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("User id cannot be an empty Guid.");

        Value = value;
    }

    public Guid Value { get; }
}
