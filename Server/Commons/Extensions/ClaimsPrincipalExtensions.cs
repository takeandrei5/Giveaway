using System.Security.Claims;
using SoftwareCraft.Functional;

namespace Giveaway.Commons.Extensions;

public static class ClaimsPrincipalExtension
{
    public static Maybe<string> GetEmail(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims
            .FirstOrDefault(claim => claim.Type == ClaimTypes.Email);

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value)) return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }

    public static Maybe<string> GetName(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims
            .FirstOrDefault(claim => claim.Type == ClaimTypes.Name);

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value)) return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }

    public static Maybe<string> GetImage(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims
            .FirstOrDefault(claim => claim.Type == ClaimTypes.Uri);

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value)) return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }

    public static Maybe<string> GetNameIdentifier(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims
            .FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value)) return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }
}
