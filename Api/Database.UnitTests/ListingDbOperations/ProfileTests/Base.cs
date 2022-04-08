using AutoFixture;
using Giveaway.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

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
