namespace Giveaway.WebApi.Models;

public class UserInfoModel
{
    public string Sub { get; init; } = null!;

    public string Given_name { get; init; } = null!;

    public string Family_name { get; init; } = null!;

    public string Nickname { get; init; } = null!;

    public string Name { get; init; } = null!;

    public string Picture { get; init; } = null!;

    public string Locale { get; init; } = null!;

    public DateTime Updated_at { get; init; }

    public string Email { get; init; } = null!;

    public bool Email_verified { get; init; }
}