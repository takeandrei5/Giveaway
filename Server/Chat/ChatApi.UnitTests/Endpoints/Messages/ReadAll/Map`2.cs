namespace Giveaway.Chat.ChatApi.UnitTests.Endpoints.Messages.ReadAll;

public sealed class Map_2 : Base
{
    [Fact(DisplayName =
        "AutoMapper maps ConversationDtoModel.ConversationMessage to ReadAllResponse.ConversationMessage successfully.")]
    public void
        AutoMapper_Maps_ConversationDtoModel_ConversationMessage_To_ReadAllResponse_ConversationMessage_Successfully()
    {
        // Arrange
        var source = CreateConversationMessage();

        var destination = new ReadAllResponse.ConversationMessage
        {
            Message = source.Message,
            IsMine = source.IsMine,
            SendDate = source.SendDate
        };

        // Act
        var result = Mapper.Map<ReadAllResponse.ConversationMessage>(source);

        // Assert
        result.Should()
           .BeEquivalentTo(destination);
    }
}
