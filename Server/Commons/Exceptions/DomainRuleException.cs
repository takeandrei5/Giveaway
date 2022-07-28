namespace Giveaway.Commons.Exceptions;

public sealed class DomainRuleException : Exception
{
    public DomainRuleException(string message) : base(message) { }
}
