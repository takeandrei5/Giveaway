using FluentAssertions;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Helpers;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Database.IntegrationTests.ListingDbOperations.RepositoryTests;

public sealed class FindListingById_2 : Base
{
    [Fact(DisplayName = "FindListingById returns success result.")]
    public async Task FindListingById_Returns_Success_Result()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10).ToList();
        var categories = _fixture.CreateManyCategoryEntity().ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));
        var listings = _fixture.CreateManyListingEntity(user.Id.Value, 1).ToList();
        var images = listings.SelectMany(listing => _fixture.CreateManyImageEntity(listing.Id, 1)).ToList();

        var listingId = new ListingId(listings[0].Id);

        _loggedUserMock.Setup(mock => mock.GetEmailFromClaims())
           .Returns(user.Information.Email.Value);

        await SetupDatabase(images, listings, users);

        // Act
        var result = await _sut.FindListingByIdAsync(listingId, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.OnSuccess(res => res.Id.Value.Should().Be(listingId.Value));
    }
}
