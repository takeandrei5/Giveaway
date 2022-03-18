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

public sealed class FindListingById_2 : Base
{
    [Fact(DisplayName = "FindListingById returns success result.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10)
            .ToList();

        var listingId = new ListingId(_fixture.Create<Guid>());

        var user = new User(new(users[0].Id), new(users[0].Email));
        var listings = _fixture.CreateManyListingEntity(user.Id.Value, 1);

        await SetupDatabase(listings, users);

        // Act
        var result = await _sut.FindListingByIdAsync(listingId, CancellationToken.None);

        // Assert
        result.OnSuccess(res => res.Id.Value.Should()
            .Be(listings.First().Id));
    }
}
