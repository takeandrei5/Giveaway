using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giveaway.Chat.Database.Persistence.Entities;

public sealed record MessageEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = null!;

    [BsonElement("fromUser")]
    public string FromUser { get; init; } = null!;

    [BsonElement("toUser")]
    public string ToUser { get; init; } = null!;

    [BsonElement("message")]
    public string Message { get; init; } = null!;

    [BsonElement("sentDate")]
    public DateTime SendDate { get; init; } = DateTime.UtcNow;
}