using System;
using AutoFixture;
using Giveaway.Domain.Users;
using Helpers;

namespace Giveaway.Web.Application.UnitTests;

public static class FixtureExtensions
{
    public static User CreateUser(this Fixture fixture) =>
        new(new UserId(fixture.Create<Guid>()),
            new UserInformation(new UserEmail(fixture.CreateEmail()),
            new UserName(fixture.Create<string>()),
            new UserImage(fixture.CreateUrl())));
}
