using AutoFixture;
using Database.Persistence.Entities;
using Domain.Items;
using Domain.Listings;
using Extensions;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Database.UnitTests.ItemDbOperations;
using Domain.Users;

namespace Giveaway.Database.UnitTests.ListingDbOperations.RepositoryTests;

public sealed class CreateAsync_1 : Base
{
    [Fact(DisplayName = "CreateAsync inserts ItemEntity successfully.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10)
            .ToList();

        var user = new User(new(users[0].Id), new(users[0].Name));

        await SetupDatabase(users);

        var newListing = new Listing(new ListingId(_fixture.Create<Guid>()),
            new ListingTitle(_fixture.CreateTextWithMaxLength(50)),
            new ListingDescription(_fixture.CreateTextWithMaxLength(250)), user);

        // Act
        await _sut.CreateAsync(newListing, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Listings
            .Where(x => x.Id == newListing.Id.Value && x.OwnerId == user.Id.Value)
            .Count()
            .Should()
            .Be(1);
    }
}
