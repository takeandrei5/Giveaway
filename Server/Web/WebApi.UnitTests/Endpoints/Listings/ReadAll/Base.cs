using AutoFixture;
using Helpers;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;

    protected Base() : base("Giveaway.Web.WebApi") => _fixture = new Fixture();
}
