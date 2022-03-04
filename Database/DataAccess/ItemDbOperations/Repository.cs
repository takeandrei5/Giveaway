using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Items;

namespace Giveaway.Database.DataAccess.ItemDbOperations;

public sealed class Repository : IItemRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<string>> CreateManyAsync(IEnumerable<Item> items, CancellationToken cancellationToken)
    {
        try
        {
            await _dbContext.Items.AddRangeAsync(items.Select(item => new ItemEntity
            {
                Id = item.Id.Value,
                ListingId = item.ListingId.Value,
                Title = item.Title.Value,
                Description = item.Description.Value,
            }), cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new Success<string>();
        }
        catch (DbUpdateException ex)
        {
            return ex.Message.AsError();
        }
    }
}
