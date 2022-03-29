using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.Persistence.Entities;

public sealed class ListingEntity
{
    public Guid Id { get; init; }

    public Guid OwnerId { get; init; }

    public int CategoryId { get; init; }

    public CategoryEntity Category { get; init; } = null!;

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public IEnumerable<Image> Images { get; set; } = Enumerable.Empty<Image>();

    public DateTime CreatedAt { get; set; }

    public DateTime LastModifiedAt { get; set; }

    public sealed record Image
    {
        public string ImageAddress { get; init; } = null!;
    }
}
