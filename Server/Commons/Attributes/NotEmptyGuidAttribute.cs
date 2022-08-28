using System.ComponentModel.DataAnnotations;

namespace Giveaway.Commons.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NotEmptyGuidAttribute : ValidationAttribute
{
    private const string _defaultErrorMessage = "Guid must not be not empty.";

    public NotEmptyGuidAttribute() : base(_defaultErrorMessage)
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is not Guid guid) return true;

        return guid != Guid.Empty;
    }
}
