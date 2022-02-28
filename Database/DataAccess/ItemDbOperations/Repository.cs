using Database.Persistence.Entities;
using Domain.Interfaces;
using Domain.Items;
using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.DataAccess.ItemDbOperations;

public sealed class Repository : IItemRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<string>> CreateAsync(Item item, CancellationToken cancellationToken)
    {
        try
        {
            await _dbContext.Items.AddAsync(new ItemEntity
            {
                Id = item.Id.Value,
                ListingId = item.ListingId.Value,
                Title = item.Title.Value,
                Description = item.Description.Value,
            }, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new Success<string>();
        }
        catch (DbUpdateException ex)
        {
            return ex.Message.AsError();
        }
    }
}
