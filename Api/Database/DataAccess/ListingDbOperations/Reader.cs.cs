using AutoMapper;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Domain.Listings;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
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

    public async Task<PaginatedResult<ReadAllListingsModel>> ReadAllListingsAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken)
    {
        IQueryable<ListingEntity> ApplyOrdering(IQueryable<ListingEntity> source)
        {
            if (source is null) throw new ArgumentNullException(nameof(source));

            source = listPagedQuery.FilterByCategory != null
                ? source.Where(s => s.CategoryId == listPagedQuery.FilterByCategory)
                : source;

            var parameter = Expression.Parameter(typeof(ListingEntity));

            var memberExpression = Expression.PropertyOrField(parameter, listPagedQuery.OrderBy);

            var orderByExpression = Expression.Lambda(memberExpression, parameter);

            var resultExpression = Expression.Call(typeof(Queryable), nameof(Queryable.OrderBy),
                new[] { parameter.Type, orderByExpression.ReturnType },
                source.Expression, Expression.Quote(orderByExpression));

            return source.Provider.CreateQuery<ListingEntity>(resultExpression);
        }

        var listingEntities = await _dbContext.Listings
            .IgnoreQueryFilters()
            .Include(listing => listing.Images)
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
            .SingleAsync(cancellationToken);

        return _mapper.Map<ReadListingByIdModel>(listingEntity);
    }
}
