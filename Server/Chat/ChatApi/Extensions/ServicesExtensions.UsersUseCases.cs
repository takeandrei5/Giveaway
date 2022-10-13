namespace Giveaway.Chat.ChatApi.Extensions;

using CreateUserUseCase = Application.UseCases.Users.CreateUser.Command;

public static partial class ServicesExtensions
{
    private static void AddCreateUserUseCase(this IServiceCollection services) =>
       services.AddScoped<CreateUserUseCase>();
}
