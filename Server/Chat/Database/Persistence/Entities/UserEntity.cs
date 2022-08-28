using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giveaway.Chat.Database.Persistence.Entities;

public sealed record UserEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = null!;

    [BsonElement("email")]
    public string Email { get; init; } = null!;
    
    [BsonElement("name")]
    public string Name { get; init; } = null!;
    
    [BsonElement("image")]
    public string Image { get; init; } = null!;
}
