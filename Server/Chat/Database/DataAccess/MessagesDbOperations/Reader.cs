using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Chats.ReadAllChats.Models;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail.Models;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Users;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giveaway.Chat.Database.DataAccess.MessagesDbOperations;

public sealed class Reader : IMessageReader
{
    private readonly IMongoCollection<MessageEntity> _messagesCollection;
    private readonly IMongoCollection<UserEntity> _usersCollection;

    public Reader(IOptions<ChatDatabaseSettings> chatDatabaseSettings)
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

    public async Task<ChatsDtoModel> ReadChatsByUserEmailAsync(UserEmail userEmail, CancellationToken cancellationToken)
    {
        var messages = await _messagesCollection.Aggregate()
           .Lookup<MessageEntity, UserEntity, UserChatEntity>(_usersCollection,
                x => x.FromUser == userEmail.Value
                    ? x.ToUser
                    : x.FromUser,
                y => y.Email,
                z => z)
           .SortByDescending(message => message.MessageSendDate)
           .ToListAsync(cancellationToken);
        // .Find(message =>
        //      message.FromUser == userEmail.Value || message.ToUser == userEmail.Value)
        // .SortByDescending(message => message.SendDate)
        // .ToListAsync(cancellationToken);

        // var finalResult = messages.GroupBy(message =>
        //         message.FromUser == userEmail.Value 
        //             ? message.ToUser 
        //             : message.FromUser)
        //    .Select(group => new ChatsDtoModel.Chat
        //    {
        //        Email = group.Key,
        //        Image = group.First().
        //        LastMessage = group.First().Message,
        //        LastMessageSendDate = group.Last().SendDate
        //    })
        //    .ToList();
        //
        // return new ChatsDtoModel()
        // {
        //     Messages = result.Select(message => new ConversationDtoModel.ConversationMessage
        //     {
        //         IsMine = currentUserEmail.Value == message.FromUser,
        //         Message = message.Message,
        //         SendDate = message.SendDate
        //     })
        // };

        throw new NotImplementedException();
    }
}
