using AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;

namespace Database.UnitTests.ItemDbOperations;

public static class FixtureExtensions
{
    public static IEnumerable<UserEntity> CreateManyUserEntity(this Fixture fixture, int count = 10)
    {
        var users = new List<UserEntity>();

        foreach (var _ in ..count)
        {
            users.Add(new UserEntity
            {
                Id = fixture.Create<Guid>(),
                Email = fixture.CreateEmail(),
                Name = fixture.Create<string>(),
                // todo
                Image = "https://www.google.com"
            });
        }

        return users;
    }

    public static IEnumerable<ListingEntity> CreateManyListingEntity(this Fixture fixture, Guid ownerId, int count = 10)
    {
        var listings = new List<ListingEntity>();

        foreach (var _ in ..count)
        {
            listings.Add(new ListingEntity
            {
                Id = fixture.Create<Guid>(),
                OwnerId = ownerId,
                Title = fixture.CreateTextWithMaxLength(50),
                Description = fixture.CreateTextWithMaxLength(250),
            });
        }

        return listings;
    }
}
