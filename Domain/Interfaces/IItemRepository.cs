using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Items;

namespace Giveaway.Domain.Interfaces;
public interface IItemRepository
{
    Task<Result<string>> CreateAsync(Item item, CancellationToken cancellationToken);
}
