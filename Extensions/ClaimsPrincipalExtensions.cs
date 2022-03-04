using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Extensions;

public static class ClaimsPrincipalExtension
{
    public static Maybe<string> GetEmail(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims
            .FirstOrDefault(x => x.Type == "preferred_username");

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value)) return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }
}
