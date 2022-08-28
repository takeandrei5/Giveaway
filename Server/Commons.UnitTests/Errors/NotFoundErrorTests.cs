using FluentAssertions;
using Giveaway.Commons.Errors;
using Xunit;

namespace Commons.UnitTests.Errors;

public class NotFoundErrorTests
{
    [Fact(DisplayName = "NotFoundError should have correct values.")]
    public void NotFoundError_Should_Have_Correct_Values()
    {
        // Arrange
        const int statusCode = 404;
        const string message = "error";
        const string title = "Not found error.";
        const string type = "https://tools.ietf.org/html/rfc7231#section-6.5.4";

        // Act
        var error = new NotFoundError(message);

        // Assert
        error.Should()
           .Match<NotFoundError>(notFoundError =>
                notFoundError.Status == statusCode
                && notFoundError.Message == message
                && notFoundError.Title == title
                && notFoundError.Type == type);
    }
}
