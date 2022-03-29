﻿using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.ReadListingById.Models;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Application.UseCases.ReadListingById;
public sealed class Command
{
    private readonly IListingReader     _listingReader;
    private readonly IListingRepository _listingRepository;

    public Command(IListingReader listingReader, IListingRepository listingRepository)
    {
        _listingReader = listingReader;
        _listingRepository = listingRepository;
    }

    public async Task<Result<ListingReadModel, string>> ExecuteAsync(ListingId id, CancellationToken cancellationToken)
    {
        var listingResult = await _listingRepository.FindListingByIdAsync(id, cancellationToken);

        return await listingResult.SelectManyAsync(async listing => {
            var listingReadModel = await _listingReader.ReadListingById(listing.Id, cancellationToken);
            return listingReadModel.AsSuccess<ListingReadModel, string>();
        });
    }
}
