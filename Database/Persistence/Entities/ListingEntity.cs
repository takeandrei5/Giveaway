using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Persistence.Entities;

public sealed class ListingEntity
{
    public Guid Id { get; init; }

    public Guid OwnerId { get; init; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime LastModifiedAt { get; set; }
}
