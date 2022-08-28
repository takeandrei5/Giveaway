using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail;

namespace Giveaway.Chat.ChatApi.Extensions;

using CreateMessageUseCase = Application.UseCases.Messages.CreateMessage.Command;
using ReadMessagesByTargetEmail = Command;

public static partial class ServicesExtensions
{
    private static void AddCreateMessageUseCase(this IServiceCollection services) =>
       services.AddScoped<CreateMessageUseCase>();

    private static void AddReadMessagesByTargetEmailUseCase(this IServiceCollection services) =>
        services.AddScoped<ReadMessagesByTargetEmail>();
}
