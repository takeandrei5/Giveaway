using FluentAssertions;
using Giveaway.Commons.Attributes;
using Xunit;

namespace Commons.UnitTests.Attributes;

public sealed class NotEmptyGuidTests
{
    [Fact(DisplayName = "NotEmptyGuid attribute returns false if the GUID is empty.")]
    public void NotEmptyGuid_Attribute_Returns_False_Correctly_If_Guid_Is_Empty()
    {
        // Arrange
        var notEmptyGuidAttribute = new NotEmptyGuidAttribute();

        // Act
        var result = notEmptyGuidAttribute.IsValid(Guid.Empty);

        // Assert
        result.Should()
            .BeFalse();
    }

    [Fact(DisplayName = "NotEmptyGuid returns true if the GUID is not empty.")]
    public void NotEmptyGuid_Attribute_Returns_True_If_Guid_Is_Not_Empty()
    {
        // Arrange
        var notEmptyGuidAttribute = new NotEmptyGuidAttribute();

        // Act
        var result = notEmptyGuidAttribute.IsValid(Guid.NewGuid());

        // Assert
        result.Should()
            .BeTrue();
    }

    [Fact(DisplayName = "NotEmptyGuid attribute returns true if the GUID is null")]
    public void NotEmptyGuid_Attribute_Returns_True_If_Guid_Is_Null()
    {
        // Arrange
        var notEmptyGuidAttribute = new NotEmptyGuidAttribute();

        // Act
        var result = notEmptyGuidAttribute.IsValid(null);

        // Assert
        result.Should()
            .BeTrue();
    }
}
