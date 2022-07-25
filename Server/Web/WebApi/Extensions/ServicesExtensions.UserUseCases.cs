using Giveaway.Web.Application.UseCases.Users.CreateUser;

namespace Giveaway.Web.WebApi.Extensions;

public partial class ServicesExtensions
{
    public static void AddCreateUserUseCase(this IServiceCollection services) =>
        services.AddScoped<Command>();
}
