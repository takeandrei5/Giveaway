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

public sealed class FindListingById_1 : Base
{
    [Fact(DisplayName = "FindListingById returns error result if no listing could be found for the given listing id.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10)
            .ToList();
        var listingId = new ListingId(_fixture.Create<Guid>());

        var user = new User(new(users[0].Id), new(users[0].Name), new(users[0].Email));

        await SetupDatabase(users);

        // Act
        var result = await _sut.FindListingByIdAsync(listingId, CancellationToken.None);

        // Assert
        result.OnError(err => err.Should()
            .BeEquivalentTo($"The listing with id {listingId.Value} could not be found."));
    }
}
