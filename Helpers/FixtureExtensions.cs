using AutoFixture;

namespace Helpers;

public static class FixtureExtensions
{
    public static string CreateTextWithMaxLength(this Fixture fixture, int length) =>
        string.Join("", fixture.CreateMany<char>(length));

    public static string CreateEmail(this Fixture fixture) => $"test{new Random().Next(1000)}@test.com";

    public static string CreateUrl(this Fixture fixture) => $"https://www.{fixture.Create<string>()}.com";
}
