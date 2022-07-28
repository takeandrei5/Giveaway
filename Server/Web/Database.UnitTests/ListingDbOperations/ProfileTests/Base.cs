using AutoFixture;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace Giveaway.Web.Database.UnitTests.ListingDbOperations.ProfileTests;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;
    private readonly Profile _sut;

    protected Base() : base("Giveaway.Web.Database")
    {
        _fixture = new Fixture();
        _sut = new Profile();
    }
}
