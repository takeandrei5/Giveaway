using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;
using Giveaway.Domain.Users;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Database.UnitTests;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ReaderTests;

public sealed class ReadListingByIdAsync_1 : Base
{
    [Fact(DisplayName = "ReadListingByIdAsync returns ListingDtoModel.")]
    public async Task ExecuteAsync()
    {
        // Arrange
        var userEntities = _fixture.CreateManyUserEntity(10)
            .ToList();

        var user = new User(new(userEntities[0].Id), new(new(userEntities[0].Email),
            new(userEntities[0].Name), new(userEntities[0].Image)));

        var listingEntities = _fixture.CreateManyListingEntity(user.Id.Value, 1, 1)
            .ToList();

        var imageEntities = listingEntities.SelectMany(listingEntity => _fixture.CreateManyImageEntity(listingEntity.Id, 1))
            .ToList();

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(user.Information.Email.Value);

        var listingEntity = listingEntities[0];
        var listingsResult = new ListingDtoModel
        {
            Id = listingEntity.Id,
            Title = listingEntity.Title,
            Description = listingEntity.Description,
            Category = listingEntity.CategoryId,
            Images = imageEntities.Select(image => new ListingDtoModel.Image
            {
                Url = image.Url,
            })
        };

        await SetupDatabase(imageEntities, listingEntities, userEntities);

        // Act
        var result = await _sut.ReadListingByIdAsync(new(listingEntity.Id), CancellationToken.None);

        // Assert
        result.Should()
            .BeEquivalentTo(listingsResult);
    }
}
