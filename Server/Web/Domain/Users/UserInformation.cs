namespace Giveaway.Web.Domain.Users;

public sealed record UserInformation
{
    internal UserInformation(UserEmail email, UserName name, UserImage image)
    {
        Email = email;
        Name = name;
        Image = image;
    }

    public UserEmail Email { get; }

    public UserName Name { get; }

    public UserImage Image { get; }
}
