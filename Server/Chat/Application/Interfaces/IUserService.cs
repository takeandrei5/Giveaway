using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.Interfaces;

public interface IUserService
{
    Task<Result<User, NotFoundError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken);
}
