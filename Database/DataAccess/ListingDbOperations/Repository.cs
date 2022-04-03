using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Errors;
using Microsoft.Data.SqlClient;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Repository : IListingRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task CreateAsync(Listing listing, CancellationToken cancellationToken)
    {
        await _dbContext.Listings.AddAsync(new ListingEntity
        {
            Id = listing.Id.Value,
            Title = listing.Title.Value,
            Description = listing.Description.Value,
            OwnerId = listing.OwnerId.Value,
            CategoryId = listing.Category.Id
        }, cancellationToken);

        await _dbContext.Images.AddRangeAsync(listing.Images.Select(image => new ImageEntity
        {
            Id = Guid.NewGuid(),
            ListingId = listing.Id.Value,
            Url = image.Value
        }), cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Result<Listing, NotFoundError>> FindListingByIdAsync(ListingId listingId, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .Where(listing => listing.Id == listingId.Value)
            .Include(listing => listing.Category)
            .Include(listing => listing.Images)
            .SingleOrDefaultAsync(cancellationToken);

        if (listingEntity is null)
            return new NotFoundError($"The listing with id {listingId.Value} could not be found.")
                .AsError<Listing, NotFoundError>();

        return new Listing(listingId,
                new ListingTitle(listingEntity.Title),
                new ListingDescription(listingEntity.Description),
                new UserId(listingEntity.OwnerId),
                listingEntity.Images.Select(image => new ListingImage(image.Url)),
                Category.From(listingEntity.Category.Id))
            .AsSuccess<Listing, NotFoundError>();
    }
}
