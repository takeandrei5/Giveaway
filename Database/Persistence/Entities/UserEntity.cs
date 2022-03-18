using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.Persistence.Entities;

public sealed class UserEntity
{
    public Guid Id { get; init; }

    public string Email { get; set; } = null!;
}
