namespace Giveaway.Commons.Models;

public sealed record AuthOptions
{
    public string Domain { get; init; } = null!;

    public string ClientId { get; init; } = null!;
    
    public string Audience { get; init; } = null!;
}
