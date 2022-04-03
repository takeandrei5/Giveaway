using AutoMapper;
using Giveaway.Application.Interfaces;
using Giveaway.Domain.Listings;
using Microsoft.EntityFrameworkCore;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Reader : IListingReader
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public Reader(AppDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ReadAllListingsModel>> ReadAllListingsAsync(CancellationToken cancellationToken)
    {
        var listingEntities = await _dbContext.Listings
            .Include(listing => listing.Images)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<ReadAllListingsModel>>(listingEntities);
    }

    public async Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .Where(listing => listing.Id == id.Value)
            .Include(listing => listing.Category)
            .Include(listing => listing.Images)
            .SingleAsync(cancellationToken);

        return _mapper.Map<ReadListingByIdModel>(listingEntity);
    }
}
