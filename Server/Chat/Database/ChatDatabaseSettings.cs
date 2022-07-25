namespace Giveaway.Chat.Database;

public sealed class ChatDatabaseSettings
{
    public string ConnectionString { get; init; } = null!;

    public string DatabaseName { get; init; } = null!;

    public string CollectionName { get; init; } = null!;
}
