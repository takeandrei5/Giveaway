namespace Giveaway.Chat.ChatApi.UnitTests.Endpoints.Messages.ReadAll;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ConversationDtoModel to ReadAllResponse successfully.")]
    public void AutoMapper_Maps_ConversationDtoModel_To_ReadAllResponse_Successfully()
    {
        // Arrange
        var conversationMessage1 = CreateConversationMessage();
        var conversationMessage2 = CreateConversationMessage();

        var source = new ConversationDtoModel
        {
            Messages = new List<ConversationDtoModel.ConversationMessage>
            {
                conversationMessage1,
                conversationMessage2
            }
        };

        var destination = new ReadAllResponse
        {
            Conversation = new List<ReadAllResponse.ConversationMessage>
            {
                new()
                {
                    Message = conversationMessage1.Message,
                    IsMine = conversationMessage1.IsMine,
                    SendDate = conversationMessage1.SendDate
                },
                new()
                {
                    Message = conversationMessage2.Message,
                    IsMine = conversationMessage2.IsMine,
                    SendDate = conversationMessage2.SendDate
                }
            }
        };

        // Act
        var result = Mapper.Map<ReadAllResponse>(source);

        // Assert
        result.Should()
           .BeEquivalentTo(destination);
    }
}
