using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;
using Giveaway.Web.Domain.Users;
using Helpers;
using Moq;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.RepositoryTests;

public sealed class DeleteAsync_1 : Base
{
    [Fact(DisplayName = "DeleteAsync deletes ListingEntity successfully and their images.")]
    public async Task DeleteAsync_Inserts_ListingEntity_Successfully()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10).ToList();
        var categories = _fixture.CreateManyCategoryEntity().ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));
        var listings = _fixture.CreateManyListingEntity(user.Id.Value, 1).ToList();
        var images = listings.SelectMany(listing => _fixture.CreateManyImageEntity(listing.Id, 1)).ToList();

        _loggedUserMock.Setup(mock => mock.GetEmailFromClaims())
           .Returns(user.Information.Email.Value);

        var listing = new Listing(new(listings[0].Id),
            new(listings[0].Title),
            new(listings[0].Description),
            new(listings[0].OwnerId),
            images.Where(image => image.ListingId == listings[0].Id).Select(image => new ListingImage(image.Url)),
            Category.From(listings[0].CategoryId));

        await SetupDatabase(images, listings, users);

        // Act
        await _sut.DeleteAsync(listing, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Listings
            .Where(l => l.Id == listing.Id.Value)
            .Count()
            .Should()
            .Be(0);

        _dbContext.Images
            .Where(image => image.ListingId == listing.Id.Value)
            .Count()
            .Should()
            .Be(0);
    }
}
