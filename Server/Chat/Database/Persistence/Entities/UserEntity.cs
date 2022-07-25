using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giveaway.Chat.Database.Persistence.Entities;

public sealed record UserEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; init; } = null!;

    [BsonElement("userEmail")]
    public string UserEmail { get; init; } = null!;
    
    [BsonElement("userName")]
    public string UserName { get; init; } = null!;
    
    [BsonElement("userImage")]
    public string UserImage { get; init; } = null!;
}
