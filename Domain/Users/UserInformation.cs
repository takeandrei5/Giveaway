namespace Giveaway.Domain.Users;

public sealed record UserInformation
{
    public UserInformation(UserEmail email, UserName name, UserImage image)
    {
        Email = email;
        Name = name;
        Image = image;
    }

    public UserEmail Email { get; init; }

    public UserName Name { get; init; }

    public UserImage Image { get; init; }
}
