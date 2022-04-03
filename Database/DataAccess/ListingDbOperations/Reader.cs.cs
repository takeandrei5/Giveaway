﻿using AutoMapper;
using Giveaway.Application.Interfaces;
using Giveaway.Domain.Listings;
using Giveaway.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingReadModel;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

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

    public async Task<IEnumerable<ReadAllListingsModel>> ReadAllListings(CancellationToken cancellationToken)
    {
        var listingEntities = await _dbContext.Listings
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<ReadAllListingsModel>>(listingEntities);
    }

    public async Task<ReadListingByIdModel> ReadListingById(ListingId id, CancellationToken cancellationToken)
    {
        var listingEntity = await _dbContext.Listings
            .Where(listing => listing.Id == id.Value)
            .Include(listing => listing.Category)
            .Include(listing => listing.Images)
            .SingleAsync(cancellationToken);

        return _mapper.Map<ReadListingByIdModel>(listingEntity);
    }
}
