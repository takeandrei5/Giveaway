using Giveaway.Application.Interfaces;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Users;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Application.UseCases.CreateUser;

public sealed class Command
{
    private readonly ILoggedUser        _loggedUser;
    private readonly IUserRepository    _userRepository;

    public Command(ILoggedUser loggedUser, IUserRepository userRepository)
    {
        _loggedUser = loggedUser;
        _userRepository = userRepository;
    }

    public async Task<Maybe<UserId>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();
        var fullName = _loggedUser.GetNameFromClaims();
        var image = _loggedUser.GetImageFromClaims();

        try
        {
            var user = await _userRepository.FindUserByEmailAsync(email, cancellationToken);

            return Maybe.None<UserId>();
        }
        catch (Exception)
        {
            var newUser = new User(new(Guid.NewGuid()), new(new UserEmail(email), new UserName(fullName), new UserImage(image)));
            await _userRepository.CreateAsync(newUser, cancellationToken);

            return Maybe.Some(newUser.Id);
        }
    }
}
