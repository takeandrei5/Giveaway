using AutoMapper;
using Giveaway.Commons.Extensions;
using Giveaway.Commons.Extra.Pagination;
using Giveaway.Web.Application.Interfaces;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Web.Database.Persistence.Entities;
using Giveaway.Web.Domain.Listings;
using Microsoft.EntityFrameworkCore;
using ReadAllListingsModel = Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Web.Database.DataAccess.ListingDbOperations;

public sealed class Reader : IListingReader
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public Reader(AppDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<PaginatedResult<ReadAllListingsModel>> ReadAllListingsAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken)
    {
        IQueryable<ListingEntity> ApplyOrdering(IQueryable<ListingEntity> source)
        {
            source = listPagedQuery.FilterByCategory != null
                ? source.Where(s => s.CategoryId == listPagedQuery.FilterByCategory)
                : source;

            return source.OrderBy(listPagedQuery.OrderBy);
        }

        var listingEntities = await _dbContext.Listings
            .IgnoreQueryFilters()
            .Include(listing => listing.Images.Where(image => image.Index == 1))
            .ToPaginatedListAsync(listPagedQuery, ApplyOrdering, cancellationToken);

        return _mapper.Map<PaginatedResult<ReadAllListingsModel>>(listingEntities);
    }

    public async Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .IgnoreQueryFilters()
            .Where(listing => listing.Id == id.Value)
            .Include(listing => listing.Category)
            .Include(listing => listing.Images)
            .Include(listing => listing.Owner)
            .SingleAsync(cancellationToken);

        return _mapper.Map<ReadListingByIdModel>(listingEntity);
    }
}
