using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.CreateListing;

namespace Giveaway.Application.UseCases.CreateListing;
public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;

    public Command(ILoggedUser currentUserEmailProvider)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
    }

    public Result<string> ExecuteAsync(CommandFeed feed, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
