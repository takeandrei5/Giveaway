﻿using AutoFixture;
using Giveaway.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace WebApi.UnitTests.Endpoints.Listings.ReadOne;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;
    protected readonly Profile _sut;

    public Base()
    {
        _fixture = new();
        _sut = new();
    }
}
