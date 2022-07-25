using AutoFixture;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace Giveaway.Web.Database.UnitTests.ListingDbOperations.ProfileTests;

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
