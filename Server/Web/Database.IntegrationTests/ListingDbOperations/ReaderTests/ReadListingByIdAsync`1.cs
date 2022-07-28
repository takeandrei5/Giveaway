using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models;
using Giveaway.Web.Domain.Users;
using Helpers;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.ReaderTests;

public sealed class ReadListingByIdAsync_1 : Base
{
    [Fact(DisplayName = "ReadListingByIdAsync returns ListingDtoModel.")]
    public async Task ReadListingByIdAsync_Returns_ListingDtoModel()
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
        var listingResult = new ListingDtoModel
        {
            Id = listingEntity.Id,
            Title = listingEntity.Title,
            Description = listingEntity.Description,
            Category = listingEntity.CategoryId,
            Images = imageEntities.Select(image => image.Url),
            OwnerEmail = user.Information.Email.Value,
            OwnerName = user.Information.Name.Value,
            OwnerImage = user.Information.Image.Value,
        };

        await SetupDatabase(imageEntities, listingEntities, userEntities);

        // Act
        var result = await _sut.ReadListingByIdAsync(new(listingEntity.Id), CancellationToken.None);

        // Assert
        result.Should()
            .BeEquivalentTo(listingResult, opt => opt.Excluding(field => field.CreatedAt));
    }
}
