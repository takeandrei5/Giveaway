using AutoFixture;
using FluentAssertions;
using Giveaway.Commons.Extensions;
using Xunit;

namespace Commons.UnitTests.Extensions;

public sealed class QueryableExtensionsTests
{
    private readonly Fixture _fixture = new();

    [Fact(DisplayName = "OrderBy throws ArgumentNullException if query source is null.")]
    public void OrderBy_Throws_ArgumentNullException_If_Source_Query_Source_Is_Null()
    {
        // Arrange
        var source = default(IQueryable<object>);

        // Act
        var act = () => source!.OrderBy(_fixture.Create<string>());

        // Assert
        act.Should()
           .ThrowExactly<ArgumentNullException>();
    }

    [Fact(DisplayName = "OrderBy throws ArgumentNullException if orderBy is null.")]
    public void OrderBy_Throws_ArgumentNullException_If_OrderBy_Is_Null()
    {
        // Arrange
        var source = Enumerable.Empty<object>()
           .AsQueryable();

        // Act
        var act = () => source.OrderBy(null);

        // Assert
        act.Should()
           .ThrowExactly<ArgumentNullException>();
    }

    [Fact(DisplayName = "OrderBy throws ArgumentNullException if orderBy is empty string.")]
    public void OrderBy_Throws_ArgumentNullException_If_OrderBy_Is_Empty_String()
    {
        // Arrange
        var source = Enumerable.Empty<object>()
           .AsQueryable();

        // Act
        var act = () => source.OrderBy(string.Empty);

        // Assert
        act.Should()
           .ThrowExactly<ArgumentNullException>();
    }

    [Fact(DisplayName = "OrderBy throws ArgumentNullException if orderBy is whitespace.")]
    public void OrderBy_Throws_ArgumentNullException_If_OrderBy_Is_Whitespace()
    {
        // Arrange
        var source = Enumerable.Empty<object>()
           .AsQueryable();

        // Act
        var act = () => source.OrderBy(" \r\t");

        // Assert
        act.Should()
           .ThrowExactly<ArgumentNullException>();
    }

    [Fact(DisplayName = "OrderBy throws ArgumentNullException if orderBy is does not match regex.")]
    public void OrderBy_Throws_ArgumentNullException_If_OrderBy_Does_Not_Match_Regex()
    {
        // Arrange
        var source = Enumerable.Empty<object>()
           .AsQueryable();

        // Act
        var act = () => source.OrderBy("not_match_regex");

        // Assert
        act.Should()
           .ThrowExactly<ArgumentException>("OrderBy parameter doesn't match regex rules.");
    }

    [Fact(DisplayName = "OrderBy orders by property ASC correctly.")]
    public void OrderBy_Orders_By_Property_ASC_Correctly()
    {
        // Arrange
        var source = new List<Test>
            {
                new()
                {
                    Field1 = 10,
                    Field2 = 15
                },
                new()
                {
                    Field1 = 5,
                    Field2 = 10
                },
                new()
                {
                    Field1 = 8,
                    Field2 = 10
                }
            }
           .AsQueryable();
        
        // Act
        var result = source.OrderBy("Field1 ASC").ToList();
        
        // Assert
        result.Should()
           .BeInAscendingOrder(property => property.Field1);
    }
    
    [Fact(DisplayName = "OrderBy orders by property DESC correctly.")]
    public void OrderBy_Orders_By_Property_DESCC_Correctly()
    {
        // Arrange
        var source = new List<Test>
            {
                new()
                {
                    Field1 = 10,
                    Field2 = 15
                },
                new()
                {
                    Field1 = 5,
                    Field2 = 10
                },
                new()
                {
                    Field1 = 8,
                    Field2 = 10
                }
            }
           .AsQueryable();

        // Act
        var result = source.OrderBy("Field1 DESC").ToList();
        
        // Assert
        result.Should()
           .BeInDescendingOrder(property => property.Field1);
    }

    private record Test
    {
        public int Field1 { get; init; }

        public int Field2 { get; init; }
    }
}
