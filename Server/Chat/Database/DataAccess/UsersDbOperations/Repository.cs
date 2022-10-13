using AutoMapper;
using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Database.DataAccess.UsersDbOperations;

public sealed class Repository : IUserRepository
{
    private readonly IMapper _mapper;
    private readonly IMongoCollection<UserEntity> _usersCollection;

    public Repository(IMapper mapper, IOptions<ChatDatabaseSettings> chatDatabaseSettings)
    {
        _mapper = mapper;
        var mongoClient = new MongoClient(chatDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(chatDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<UserEntity>(chatDatabaseSettings.Value.CollectionName);
    }

    public async Task<Result<UserInformation, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await _usersCollection.Find(user => user.Email == email)
               .SingleOrDefaultAsync(cancellationToken);

            if (user is null)
                return new ForbiddenError($"User onboarding issue for email {email}")
                   .AsError<UserInformation, ForbiddenError>();

            return _mapper.Map<UserInformation>(user).AsSuccess<UserInformation, ForbiddenError>();
        } catch (Exception ex)
        {

        }

        return null;
    }

    public async Task CreateUserAsync(UserInformation user, CancellationToken cancellationToken) =>
        await _usersCollection.InsertOneAsync(_mapper.Map<UserEntity>(user),
            null,
            cancellationToken);
}
