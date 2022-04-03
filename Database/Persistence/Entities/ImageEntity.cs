using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.Persistence.Entities;

public sealed record ImageEntity
{
    public Guid Id { get; set; }

    public Guid ListingId { get; set; }

    public ListingEntity Listing { get; set; } = null!;

    public string Url { get; set; } = null!;
}
