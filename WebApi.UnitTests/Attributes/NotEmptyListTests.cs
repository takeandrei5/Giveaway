using FluentAssertions;
using Giveaway.WebApi.Attributes;
using System;
using System.Collections.Generic;
using Xunit;

namespace WebApi.UnitTests.Attributes;
public sealed class NotEmptyListTests
{
    [Fact(DisplayName = "NotEmptyList attribute works correctly if list is null.")]
    public void NotEmptyList_Attribute_Works_Correctly_If_List_Is_Null()
    {
        // Arrange
        var notEmptyListAttribute = new NotEmptyListAttribute();

        // Act
        var result = notEmptyListAttribute.IsValid(null);

        // Assert
        result.Should()
            .BeFalse();
    }

    [Fact(DisplayName = "NotEmptyList attribute works correctly if list is empty.")]
    public void NotEmptyList_Attribute_Works_Correctly_If_List_Is_Empty()
    {
        // Arrange
        var list = new List<int>();
        var notEmptyListAttribute = new NotEmptyListAttribute();

        // Act
        var result = notEmptyListAttribute.IsValid(list);

        // Assert
        result.Should()
            .BeFalse();
    }

    [Fact(DisplayName = "NotEmptyList attribute throw exception correctly if attribute is used on non-lists.")]
    public void NotEmptyList_Attribute_Works_Correctly_If_Attribute_Is_Used_On_NonLists()
    {
        // Arrange
        const int value = 10;
        var notEmptyListAttribute = new NotEmptyListAttribute();

        // Act
        var act = () => notEmptyListAttribute.IsValid(value);

        // Assert
        act.Should()
            .Throw<InvalidCastException>();
    }

    [Fact(DisplayName = "NotEmptyList attribute works correctly if list is not empty.")]
    public void NotEmptyList_Attribute_Works_Correctly_If_List_Is_Not_Empty()
    {
        // Arrange
        var list = new List<int> { 1, 2, 3 };
        var notEmptyListAttribute = new NotEmptyListAttribute();

        // Act
        var result = notEmptyListAttribute.IsValid(list);

        // Assert
        result.Should()
            .BeTrue();
    }
}