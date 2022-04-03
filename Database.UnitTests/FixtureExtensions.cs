using AutoFixture;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;
using System;
using System.Collections.Generic;

namespace Giveaway.Database.UnitTests;

public static class FixtureExtensions
{
    public static IEnumerable<UserEntity> CreateManyUserEntity(this Fixture fixture, int count = 10)
    {
        var users = new List<UserEntity>();

        foreach (var _ in ..(count - 1))
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

    public static IEnumerable<ListingEntity> CreateManyListingEntity(this Fixture fixture, Guid ownerId,
        int categoryId = 1, int count = 10)
    {
        var listings = new List<ListingEntity>();

        foreach (var _ in ..(count - 1))
        {
            listings.Add(new ListingEntity
            {
                Id = fixture.Create<Guid>(),
                OwnerId = ownerId,
                Title = fixture.CreateTextWithMaxLength(50),
                Description = fixture.CreateTextWithMaxLength(250),
                CategoryId = categoryId,
            });
        }

        return listings;
    }

    public static IEnumerable<ImageEntity> CreateManyImageEntity(this Fixture fixture, Guid listingId,
        int count = 10)
    {
        var images = new List<ImageEntity>();

        foreach (var _ in ..(count-1))
        {
            images.Add(new ImageEntity
            {
                Id = fixture.Create<Guid>(),
                ListingId = listingId,
                Url = fixture.CreateUrl(),
            });
        }

        return images;
    }
}
