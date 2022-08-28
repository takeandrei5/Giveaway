using FluentAssertions;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Messages;
using Giveaway.Chat.Domain.Users;
using Helpers;

namespace Giveaway.Chat.Database.UnitTests.UserDbOperations.ProfileTests;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps UserInformation to UserEntity successfully.")]
    public void AutoMapper_Maps_UserInformation_To_UserEntity_Successfully()
    {
        // Arrange
        var email = _fixture.CreateEmail();
        var name = _fixture.CreateTextWithMaxLength(10);
        var image = _fixture.CreateUrl();

        var source = new UserInformation(new UserEmail(email), new UserName(name), new UserImage(image));

        var destination = new UserEntity
        {
            Email = email,
            Name = name,
            Image = image
        };

        // Act
        var mapperResult = Mapper.Map<UserEntity>(source);

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
