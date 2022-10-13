using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Database.DataAccess.MessagesDbOperations;
using Giveaway.Chat.Domain.Interfaces;

namespace Giveaway.Chat.ChatApi.Extensions;

using MessageReader = Reader;
using MessageRepository = Repository;
using UserRepository = Database.DataAccess.UsersDbOperations.Repository;

public static partial class ServicesExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        // Messages
        services.AddCreateMessageUseCase();
        services.AddReadMessagesByTargetEmailUseCase();

        // Users
        services.AddCreateUserUseCase();
    }

    public static void AddReaders(this IServiceCollection services) =>
        services.AddScoped<IMessageReader, MessageReader>();

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }
}
