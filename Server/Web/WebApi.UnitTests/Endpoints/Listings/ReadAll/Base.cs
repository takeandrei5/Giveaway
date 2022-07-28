using AutoFixture;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;
    protected readonly Profile _sut;

    public Base()
    {
        _fixture = new Fixture();
        _sut = new Profile();
    }
}
