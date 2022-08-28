using AutoFixture;
using Helpers;

namespace Giveaway.Web.Database.UnitTests.ListingDbOperations.ProfileTests;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;

    protected Base() : base("Giveaway.Web.Database") => _fixture = new Fixture();
}
