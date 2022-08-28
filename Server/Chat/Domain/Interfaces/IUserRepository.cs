using Giveaway.Commons.Errors;
using SoftwareCraft.Functional;
using UserInformation = Giveaway.Chat.Domain.Users.UserInformation;

namespace Giveaway.Chat.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<UserInformation, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken);

    Task CreateUserAsync(UserInformation user, CancellationToken cancellationToken);
}
