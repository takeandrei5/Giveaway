using FluentAssertions;
using Giveaway.Commons.Errors;
using Xunit;

namespace Commons.UnitTests.Errors;

public class ForbiddenErrorTests
{
    [Fact(DisplayName = "ForbiddenError should have correct values.")]
    public void ForbiddenError_Should_Have_Correct_Values()
    {
        // Arrange
        const int statusCode = 403;
        const string message = "error";
        const string title = "Forbidden error.";
        const string type = "https://tools.ietf.org/html/rfc7231#section-6.5.3";
        
        // Act
        var error = new ForbiddenError(message);

        // Assert
        error.Should()
           .Match<ForbiddenError>(forbiddenError =>
            forbiddenError.Status == statusCode
            && forbiddenError.Message == message
            && forbiddenError.Title == title
            && forbiddenError.Type == type);
    }
}
