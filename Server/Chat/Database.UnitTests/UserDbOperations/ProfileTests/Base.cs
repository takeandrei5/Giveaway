using AutoFixture;
using Helpers;

namespace Giveaway.Chat.Database.UnitTests.UserDbOperations.ProfileTests;

public class Base : AutoMapperFixture
{
    protected readonly Fixture _fixture;

    protected Base() : base("Giveaway.Chat.Database") => _fixture = new Fixture();
}
