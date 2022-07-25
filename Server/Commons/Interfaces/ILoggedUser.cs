namespace Giveaway.Commons.Interfaces;

public interface ILoggedUser
{
    string GetEmailFromClaims();

    string GetNameFromClaims();

    string GetImageFromClaims();
}
