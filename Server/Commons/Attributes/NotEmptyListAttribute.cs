using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Giveaway.Commons.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NotEmptyListAttribute : ValidationAttribute
{
    private const string _defaultErrorMessage = "This value is not valid for {0}";

    public NotEmptyListAttribute() : base(_defaultErrorMessage)
    {
    }

    public override bool IsValid(object? value)
    {
        //NotEmpty means it must contain values
        if (value is null) return false;

        var list = ((IEnumerable)value).Cast<dynamic>();

        return list.Any();
    }
}
