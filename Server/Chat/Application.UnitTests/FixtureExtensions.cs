using AutoFixture;
using Giveaway.Chat.Domain.Users;
using Helpers;

namespace Giveaway.Chat.Application.UnitTests;

public static class FixtureExtensions
{
    internal static UserInformation CreateUserInformation(this Fixture fixture) => new(
        new UserEmail(fixture.CreateEmail()),
        new UserName(fixture.Create<string>()),
        new UserImage(fixture.CreateUrl()));
    
    internal static UserInformation CreateUserInformation(this Fixture fixture, string email) => new(
        new UserEmail(email),
        new UserName(fixture.Create<string>()),
        new UserImage(fixture.CreateUrl()));
}
