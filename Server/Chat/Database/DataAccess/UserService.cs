using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Database.DataAccess;

public sealed class UserService : IUserService
{
    private readonly IMongoCollection<UserEntity> _usersCollection;

    public UserService(IOptions<ChatDatabaseSettings> chatDatabaseSettings)
    {
        var mongoClient = new MongoClient(chatDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(chatDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<UserEntity>(chatDatabaseSettings.Value.CollectionName);
    }

    public async Task<Result<UserInformation, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken)
    {
        var user = await _usersCollection.Find(user => user.UserEmail == email)
           .SingleOrDefaultAsync(cancellationToken);

        if (user is null)
            return new ForbiddenError($"User onboarding issue for email {email}").AsError<UserInformation, ForbiddenError>();

        return new UserInformation
                (new UserEmail(user.UserEmail), new UserName(user.UserName), new UserImage(user.UserImage))
           .AsSuccess<UserInformation, ForbiddenError>();
    }
}
