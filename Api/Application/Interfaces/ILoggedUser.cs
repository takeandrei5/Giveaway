namespace Giveaway.Application.Interfaces;

public interface ILoggedUser
{
    string GetEmailFromClaims();

    string GetNameFromClaims();

    string GetImageFromClaims();
}
