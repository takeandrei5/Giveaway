using Giveaway.Database.Persistence.Entities;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;

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

        await _dbContext.Images.AddRangeAsync(listing.Images.Select((image, index) => new ImageEntity
        {
            Id = Guid.NewGuid(),
            ListingId = listing.Id.Value,
            Url = image.Value,
            IsMainImage = index == 0
        }), cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Listing listing, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .Where(listingEntity => listingEntity.Id == listing.Id.Value)
            .SingleAsync(cancellationToken);

        _dbContext.Listings.Remove(listingEntity);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Result<Listing, NotFoundError>> FindListingByIdAsync(ListingId listingId, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .IgnoreQueryFilters()
            .Where(listing => listing.Id == listingId.Value)
            .Include(listing => listing.Category)
            .Include(listing => listing.Images)
            .SingleOrDefaultAsync(cancellationToken);

        if (listingEntity is null)
        {
            return new NotFoundError($"The listing with id {listingId.Value} could not be found.")
                .AsError<Listing, NotFoundError>();
        }

        return new Listing(listingId,
                new ListingTitle(listingEntity.Title),
                new ListingDescription(listingEntity.Description),
                new UserId(listingEntity.OwnerId),
                listingEntity.Images.Select(image => new ListingImage(image.Url)),
                Category.From(listingEntity.Category.Id))
            .AsSuccess<Listing, NotFoundError>();
    }

    public async Task UpdateAsync(Listing listing, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .Where(listingEntity => listingEntity.Id == listing.Id.Value)
            .Include(listingEntity => listingEntity.Images)
            .SingleAsync(cancellationToken);

        listingEntity.Title = listing.Title.Value;
        listingEntity.Description = listing.Description.Value;
        listingEntity.CategoryId = listing.Category.Id;
        listingEntity.LastModifiedAt = DateTime.Now;

        _dbContext.Images.RemoveRange(listingEntity.Images);
        _dbContext.Images.AddRange(listing.Images.Select(image => new ImageEntity
        {
            Id = Guid.NewGuid(),
            ListingId = listing.Id.Value,
            Url = image.Value
        }));

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
