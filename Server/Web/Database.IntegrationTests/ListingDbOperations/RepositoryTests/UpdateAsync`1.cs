using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Helpers;
using Moq;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.RepositoryTests;

public sealed class UpdateAsync_1 : Base
{
    [Fact(DisplayName = "UpdateAsync updates ListingEntity successfully and their images.")]
    public async Task UpdateAsync_Updates_ListingEntity_Successfully()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10).ToList();
        var categories = _fixture.CreateManyCategoryEntity().ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));
        var listings = _fixture.CreateManyListingEntity(user.Id.Value, 1).ToList();
        var images = listings.SelectMany(listing => _fixture.CreateManyImageEntity(listing.Id, 1)).ToList();

        var newListingTitle = new ListingTitle(_fixture.CreateTextWithMaxLength(20));
        var newListingDescription = new ListingDescription(_fixture.CreateTextWithMaxLength(100));
        var newListingImages = Enumerable.Repeat(new ListingImage(_fixture.CreateUrl()), 5);
        var newListingCategory = Category.From(2);

        var listing = new Listing(new(listings[0].Id),
            newListingTitle,
            newListingDescription,
            new(listings[0].OwnerId),
            newListingImages,
            newListingCategory);

        _loggedUserMock.Setup(mock => mock.GetEmailFromClaims())
           .Returns(user.Information.Email.Value);

        await SetupDatabase(images, listings, users);

        // Act
        await _sut.UpdateAsync(listing, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Listings
            .Where(l => l.Id == listing.Id.Value
                && l.Title == listing.Title.Value
                && l.Description == listing.Description.Value
                && l.CategoryId == listing.Category.Id)
            .Count()
            .Should()
            .Be(1);

        _dbContext.Images
            .Where(l => l.ListingId == listing.Id.Value
                && listing.Images.Select(l => l.Value).Contains(l.Url))
            .Count()
            .Should()
            .Be(5);
    }
}
