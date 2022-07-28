using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.Interfaces;

public interface IUserService
{
    Task<Result<UserInformation, ForbiddenError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken);
}
