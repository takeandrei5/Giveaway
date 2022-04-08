using System.ComponentModel.DataAnnotations;

namespace Giveaway.WebApi.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NotEmptyGuidAttribute : ValidationAttribute
{
    private const string _defaultErrorMessage = "Guid must not be not empty.";

    public NotEmptyGuidAttribute() : base(_defaultErrorMessage)
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is null) return true;

        return value switch
        {
            Guid guid => guid != Guid.Empty,
            _ => true
        };
    }
}