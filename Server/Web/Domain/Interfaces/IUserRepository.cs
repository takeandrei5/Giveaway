using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Users;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken);

    Task CreateAsync(User user, CancellationToken cancellationToken);
}
