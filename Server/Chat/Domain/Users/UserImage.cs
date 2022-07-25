using System.Text.RegularExpressions;

namespace Giveaway.Chat.Domain.Users;

public sealed record UserImage
{
    private static readonly Regex _urlRegex = new(
        @"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)",
        RegexOptions.Compiled | RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));

    public UserImage(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("User image cannot be an empty url.");

        if (!_urlRegex.IsMatch(value))
            throw new ArgumentException("User image cannot be an invalid url.");

        Value = value;
    }

    public string Value { get; init; }
}
