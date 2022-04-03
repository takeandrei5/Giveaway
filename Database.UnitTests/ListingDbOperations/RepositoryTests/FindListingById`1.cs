﻿using AutoFixture;
using FluentAssertions;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Database.UnitTests.UserDbOperations.RepositoryTests;
using Giveaway.Database.UnitTests;

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

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));

        await SetupDatabase(users);

        // Act
        var userResult = await _sut.FindListingByIdAsync(listingId, CancellationToken.None);

        // Assert
        userResult.Match(
            _ => { },
            error => error.Should()
                .BeEquivalentTo(new NotFoundError($"The listing with id {listingId.Value} could not be found.")));
    }
}
