namespace Giveaway.Chat.Domain.Users;

public sealed record User
{
    public User(UserEmail email, UserName name, UserImage image)
    {
        Email = email;
        Name = name;
        Image = image;
    }

    public UserEmail Email { get; init; }

    public UserName Name { get; init; }

    public UserImage Image { get; init; }
}
