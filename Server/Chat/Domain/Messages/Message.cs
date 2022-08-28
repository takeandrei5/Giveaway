using Giveaway.Commons.Exceptions;

namespace Giveaway.Chat.Domain.Messages;

public sealed record Message
{
    public Message(string value)
    {
        if (string.IsNullOrWhiteSpace(value)) 
            throw new DomainRuleException("Message cannot be empty.");
        
        if (value.Length > 255) 
            throw new DomainRuleException("Message cannot be longer than 255 characters.");

        Value = value;
    }

    public string Value { get; }
}
