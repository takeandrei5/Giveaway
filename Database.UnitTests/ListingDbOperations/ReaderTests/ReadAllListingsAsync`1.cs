using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ReaderTests;

public sealed class ReadAllListingsAsync_1 : Base
{
    [Fact(DisplayName = "ReadAllListingsAsync returns IEnumerable<ListingDtoModel>.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var userEntities = _fixture.CreateManyUserEntity(10)
            .ToList();

        var user = new User(new(userEntities[0].Id), new(new(userEntities[0].Email),
            new(userEntities[0].Name), new(userEntities[0].Image)));

        var listingEntities = _fixture.CreateManyListingEntity(user.Id.Value)
            .ToList();

        var imageEntities = listingEntities.SelectMany(listingEntity => _fixture.CreateManyImageEntity(listingEntity.Id, 1))
            .ToList();

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(user.Information.Email.Value);

        var listings = listingEntities.Select(listing => new ListingDtoModel
        {
            Id = listing.Id,
            Title = listing.Title,
            Description = listing.Description,
            MainImageUrl = imageEntities.Where(imageEntity => imageEntity.ListingId == listing.Id).First().Url
        });

        await SetupDatabase(imageEntities, listingEntities, userEntities);

        // Act
        var result = await _sut.ReadAllListingsAsync(CancellationToken.None);

        // Assert
        result.Should()
            .BeEquivalentTo(listings);
    }
}
