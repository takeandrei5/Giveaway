using AutoFixture;
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

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));

        _loggedUserMock.Setup(mock => mock.GetEmailFromClaims())
            .Returns(user.Information.Email.Value);

        await SetupDatabase(users);

        var newListing = new Listing(new(_fixture.Create<Guid>()),
            new(_fixture.CreateTextWithMaxLength(50)),
            new(_fixture.CreateTextWithMaxLength(250)),
            user.Id,
            new List<ListingImage>
            {
                new (_fixture.CreateUrl())
            },
            Domain.Categories.Category.From(1));

        // Act
        await _sut.CreateAsync(newListing, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Listings
            .Where(listing => listing.Id == newListing.Id.Value && listing.OwnerId == user.Id.Value)
            .Count()
            .Should()
            .Be(1);
    }
}
