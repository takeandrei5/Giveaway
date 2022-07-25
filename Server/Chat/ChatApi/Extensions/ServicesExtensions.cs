using Giveaway.Chat.Application.Interfaces;

namespace Giveaway.Chat.ChatApi.Extensions;

using MessageService = Database.DataAccess.MessageService;

public static partial class ServicesExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        // Messages
        services.AddReadAllMessagesUseCase();
    }

    public static void AddServices(this IServiceCollection services) =>
        services.AddScoped<IMessageService, MessageService>();
}
