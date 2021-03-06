namespace Giveaway.Chat.ChatApi.Extensions;

using ReadAllMessagesCommand = Application.UseCases.Messages.ReadAllMessages.Command;

public static partial class ServicesExtensions
{
    private static void AddReadAllMessagesUseCase(this IServiceCollection services) =>
        services.AddScoped<ReadAllMessagesCommand>();
}
