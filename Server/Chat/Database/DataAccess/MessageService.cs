using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages.Models;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Users;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giveaway.Chat.Database.DataAccess;

public sealed class MessageService : IMessageService
{
    private readonly IMongoCollection<MessageEntity> _messagesCollection;
    private readonly IMongoCollection<UserEntity> _usersCollection;

    public MessageService(IOptions<ChatDatabaseSettings> chatDatabaseSettings)
    {
        var mongoClient = new MongoClient(chatDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(chatDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<UserEntity>(chatDatabaseSettings.Value.CollectionName);
        _messagesCollection = mongoDatabase.GetCollection<MessageEntity>(chatDatabaseSettings.Value.CollectionName);
    }

    public async Task<ConversationDtoModel> ReadConversationByUserEmailAsync(UserEmail targetUserEmail,
        UserEmail currentUserEmail, CancellationToken cancellationToken)
    {
        var result = await _messagesCollection.Find(message =>
                (message.FromUser == targetUserEmail.Value && message.ToUser == currentUserEmail.Value)
                || (message.FromUser == currentUserEmail.Value && message.ToUser == targetUserEmail.Value))
           .SortByDescending(message => message.SendDate)
           .ToListAsync(cancellationToken);

        return new ConversationDtoModel
        {
            Messages = result.Select(message => new ConversationDtoModel.ConversationMessage
            {
                IsMine = currentUserEmail.Value == message.FromUser,
                Message = message.Message,
                SendDate = message.SendDate
            })
        };
    }
}
