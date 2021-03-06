using AutoFixture;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Helpers;

namespace WebApi.UnitTests.Endpoints.Listings.ReadOne;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;
    private readonly Profile _sut;

    protected Base() : base("Giveaway.Web.WebApi")
    {
        _fixture = new Fixture();
        _sut = new Profile();
    }
}
