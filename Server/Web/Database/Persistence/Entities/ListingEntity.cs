namespace Giveaway.Web.Database.Persistence.Entities;

public sealed class ListingEntity
{
    public Guid Id { get; init; }

    public Guid OwnerId { get; init; }

    public UserEntity Owner { get; init; } = null!;

    public int CategoryId { get; set; }

    public CategoryEntity Category { get; init; } = null!;

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime LastModifiedAt { get; set; }

    public ICollection<ImageEntity> Images { get; set; } = null!;
}
