using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;
using Giveaway.WebApi.Endpoints.Listings;
using Helpers;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadOne;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingDtoModel.Image to ReadOneResponse.Image successfully.")]
    public void AutoMapper_Maps_ListingDtoModel_Image_To_ReadOneResponse_Image_Successfully()
    {
        // Arrange
        var image = _fixture.CreateUrl();

        var source = new ListingDtoModel.Image
        {
            Url = image
        };

        var destination = new ReadOneResponse.Image
        {
            Url = image
        };

        // Act
        var result = Mapper.Map<ReadOneResponse.Image>(source);

        // Assert
        result.Should()
                .BeEquivalentTo(destination);
    }
}
