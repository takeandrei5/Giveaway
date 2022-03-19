using AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;
using Giveaway.Domain.Users;

namespace Giveaway.Application.UnitTests;

public static class FixtureExtensions
{
    public static User CreateUser(this Fixture fixture) =>
        new(new UserId(fixture.Create<Guid>()),
            new UserInformation(new UserEmail(fixture.CreateEmail()),
            new UserName(fixture.Create<string>()),
            new UserImage("https://www.google.com")));
}
