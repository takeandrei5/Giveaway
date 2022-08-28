using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Chat.Domain.Messages;
using Giveaway.Chat.Domain.Users;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giveaway.Chat.Database.DataAccess.MessagesDbOperations;

public sealed class Repository : IMessageRepository
{
    private readonly IMongoCollection<MessageEntity> _messagesCollection;

    public Repository(IOptions<ChatDatabaseSettings> chatDatabaseSettings)
    {
        var mongoClient = new MongoClient(chatDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(chatDatabaseSettings.Value.DatabaseName);

        _messagesCollection = mongoDatabase.GetCollection<MessageEntity>(chatDatabaseSettings.Value.CollectionName);
    }

    public async Task CreateMessageAsync(UserEmail fromUser, UserEmail toUser, Message message,
        CancellationToken cancellationToken) => await _messagesCollection.InsertOneAsync(new MessageEntity
        {
            FromUser = fromUser.Value,
            ToUser = toUser.Value,
            Message = message.Value,
            SendDate = DateTime.Now
        },
        null,
        cancellationToken);
}
