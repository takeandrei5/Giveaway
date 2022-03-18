using Giveaway.Application.UseCases.CreateUser;

namespace Giveaway.WebApi.Extensions;

public partial class ServicesExtensions
{
    public static void AddCreateUserUseCase(this IServiceCollection services) =>
        services.AddScoped<Command>();
}
