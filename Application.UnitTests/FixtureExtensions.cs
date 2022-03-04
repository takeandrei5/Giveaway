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
        new(new UserId(fixture.Create<Guid>()), new UserName(fixture.CreateTextWithMaxLength(10)), new UserEmail(fixture.CreateEmail()));
}
