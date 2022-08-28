using FluentAssertions;
using Giveaway.Commons.Exceptions;
using Xunit;

namespace Commons.UnitTests.Exceptions;

public class DomainRuleExceptionUnitTests
{
    [Fact(DisplayName = "DomainRuleException should call base constructor.")]
    public void DomainRuleException_Should_Call_Base_Constructor()
    {
        // Arrange
        const string error = "error-message";

        Action act = () => throw new DomainRuleException(error);

        // Act
        act.Should()
           .Throw<DomainRuleException>()
           .Which.Message.Should()
           .Be(error);
    }
}
