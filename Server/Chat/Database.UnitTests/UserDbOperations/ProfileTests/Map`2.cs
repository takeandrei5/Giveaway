using FluentAssertions;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Users;
using Helpers;
using ReadListingById = Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Chat.Database.UnitTests.UserDbOperations.ProfileTests;

public sealed class Map_2 : Base
{
    [Fact(DisplayName = "AutoMapper maps UserEntity to UserInformation successfully.")]
    public void AutoMapper_Maps_UserEntity_To_UserInformation_Successfully()
    {
        // Arrange
        var email = _fixture.CreateEmail();
        var name = _fixture.CreateTextWithMaxLength(10);
        var image = _fixture.CreateUrl();

        var source = new UserEntity
        {
            Email = email,
            Name = name,
            Image = image
        };

        var destination = new UserInformation(new UserEmail(email), new UserName(name), new UserImage(image));

        // Act
        var mapperResult = Mapper.Map<UserInformation>(source);

        // Assert
        mapperResult.Should()
           .BeEquivalentTo(destination);
    }
}
