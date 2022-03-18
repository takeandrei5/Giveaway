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
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser currentUserEmailProvider, IUserRepository userRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _userRepository = userRepository;
    }

    public async Task<Maybe<UserId>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var email = _currentUserEmailProvider.GetEmailFromToken();

        var user = await _userRepository.FindUserByEmailAsync(email, cancellationToken);

        if (user is null)
        {
            var newUser = new User(new(Guid.NewGuid()), new UserEmail(email));
            await _userRepository.CreateAsync(newUser, cancellationToken);

            return Maybe.Some(newUser.Id);
        }

        return Maybe.None<UserId>();
    }
}
