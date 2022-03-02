using Database.Persistence.Entities;
using Domain.Interfaces;
using Domain.Listings;
using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.DataAccess.ListingDbOperations;

public sealed class Repository : IListingRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<string>> CreateAsync(Listing listing, CancellationToken cancellationToken)
    {
        try
        {
            await _dbContext.Listings.AddAsync(new ListingEntity
            {
                Id = listing.Id.Value,
                Title = listing.Title.Value,
                Description = listing.Description.Value,
                OwnerId = listing.Owner.Id.Value
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
