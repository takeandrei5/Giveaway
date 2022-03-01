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

namespace Database.UnitTests.ItemDbOperations.ReaderTests;

public sealed class CreateAsync_1 : Base
{
    [Fact(DisplayName = "CreateAsync inserts ItemEntity successfully.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity();
        var listings = users.SelectMany(u => _fixture.CreateManyListingEntity(u.Id))
            .ToList();
        var items = Enumerable.Empty<ItemEntity>();

        var listing = listings[0];

        await SetupDatabase(items, listings, users);

        var item = new Item(new ItemId(_fixture.Create<Guid>()),
            new ItemTitle(_fixture.CreateTextWithMaxLength(50)),
            new ListingId(listing.Id),
            new ItemDescription(_fixture.CreateTextWithMaxLength(80)));

        // Act
        await _sut.CreateAsync(item, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Items
            .Count()
            .Should()
            .Be(items.Count() + 1);
    }
}