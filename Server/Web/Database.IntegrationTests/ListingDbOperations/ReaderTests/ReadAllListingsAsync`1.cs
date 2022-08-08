using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Web.Domain.Users;
using Helpers;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.ReaderTests;

public sealed class ReadAllListingsAsync_1 : Base
{
    [Fact(DisplayName = "ReadAllListingsAsync returns PaginatedResult<ListingDtoModel>.")]
    public async Task ReadAllListingsAsync_Returns_IEnumreable_ListingDtoModel()
    {
        // Arrange
        var userEntities = _fixture.CreateManyUserEntity()
           .ToList();

        var user = new User(new UserId(userEntities[0].Id),
            new UserInformation(new UserEmail(userEntities[0].Email),
                new UserName(userEntities[0].Name),
                new UserImage(userEntities[0].Image)));

        var listingEntities = _fixture.CreateManyListingEntity(user.Id.Value)
           .ToList();

        var imageEntities = listingEntities
           .SelectMany(listingEntity => _fixture.CreateManyImageEntity(listingEntity.Id, 1))
           .ToList();

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
           .Returns(user.Information.Email.Value);

        var listings = listingEntities.Select(listing => new ListingDtoModel
        {
            Id = listing.Id,
            Title = listing.Title,
            Image = imageEntities.Where(imageEntity => imageEntity.ListingId == listing.Id).First().Url,
            CreatedAt = listing.CreatedAt
        });

        var listPagedQuery = new ListPagedQuery
        {
            PageNumber = 1,
            PageSize = 10,
            OrderBy = "Title",
            FilterByCategory = null
        };

        await SetupDatabase(imageEntities, listingEntities, userEntities);

        // Act
        var result = await _sut.ReadAllListingsAsync(listPagedQuery, CancellationToken.None);

        // Assert
        result.Result.Should()
           .BeEquivalentTo(listings);
    }
}
