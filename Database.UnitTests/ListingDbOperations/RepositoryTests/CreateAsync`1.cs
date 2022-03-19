﻿using AutoFixture;
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
using Giveaway.Domain.Users;
using Giveaway.Domain.Listings;
using Giveaway.Extensions;
using Database.UnitTests.ItemDbOperations;

namespace Giveaway.Database.UnitTests.ListingDbOperations.RepositoryTests;

public sealed class CreateAsync_1 : Base
{
    [Fact(DisplayName = "CreateAsync inserts ItemEntity successfully.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10)
            .ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].FullName), new(users[0].Image)));

        await SetupDatabase(users);

        var newListing = new Listing(new ListingId(_fixture.Create<Guid>()),
            new ListingTitle(_fixture.CreateTextWithMaxLength(50)),
            new ListingDescription(_fixture.CreateTextWithMaxLength(250)), user.Id);

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
