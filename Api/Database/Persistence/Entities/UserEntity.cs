namespace Giveaway.Database.Persistence.Entities;

public sealed class UserEntity
{
    public Guid Id { get; init; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;
}
