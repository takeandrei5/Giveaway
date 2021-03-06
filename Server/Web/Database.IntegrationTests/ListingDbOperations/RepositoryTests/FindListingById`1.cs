using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoFixture;
using FluentAssertions;
using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Listings;
using Giveaway.Web.Domain.Users;
using Helpers;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.RepositoryTests;

public sealed class FindListingById_1 : Base
{
    [Fact(DisplayName = "FindListingById returns error result if no listing could be found for the given listing id.")]
    public async Task FindListingById_Returns_Error_Result_If_No_Listing_Could_Be_Found_For_The_Given_Listing_Id()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(10).ToList();
        var listingId = new ListingId(_fixture.Create<Guid>());

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));

        await SetupDatabase(users);

        // Act
        var result = await _sut.FindListingByIdAsync(listingId, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.OnError(error => error.Should()
                .BeEquivalentTo(new NotFoundError($"The listing with id {listingId.Value} could not be found.")));
    }
}
