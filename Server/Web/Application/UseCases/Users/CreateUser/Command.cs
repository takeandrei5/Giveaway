using Giveaway.Commons.Interfaces;
using Giveaway.Web.Domain.Interfaces;
using Giveaway.Web.Domain.Users;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Application.UseCases.Users.CreateUser;

public sealed class Command
{
    private readonly ILoggedUser _loggedUser;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser loggedUser, IUserRepository userRepository)
    {
        _loggedUser = loggedUser;
        _userRepository = userRepository;
    }

    public async Task<Maybe<UserId>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();
        var name = _loggedUser.GetNameFromClaims();
        var image = _loggedUser.GetImageFromClaims();

        var userResult = await _userRepository.FindUserByEmailAsync(email, cancellationToken);

        return await userResult.MatchAsync(_ => Task.FromResult(Maybe.None<UserId>()),
            async _ =>
            {
                var newUser = new User(new UserId(Guid.NewGuid()),
                    new UserInformation(new UserEmail(email),
                        new UserName(name),
                        new UserImage(image)));
                await _userRepository.CreateAsync(newUser, cancellationToken);

                return Maybe.Some(newUser.Id);
            });
    }
}
