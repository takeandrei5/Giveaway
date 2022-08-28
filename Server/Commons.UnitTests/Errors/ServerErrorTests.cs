using FluentAssertions;
using Giveaway.Commons.Errors;
using Xunit;

namespace Commons.UnitTests.Errors;

public class ServerErrorTests
{
    [Fact(DisplayName = "ServerError should have correct values.")]
    public void ServerError_Should_Have_Correct_Values()
    {
        // Arrange
        const int statusCode = 500;
        const string message = "error";
        const string title = "Server error.";
        const string type = "https://tools.ietf.org/html/rfc7231#section-6.6.1";
        
        // Act
        var error = new ServerError(message);

        // Assert
        error.Should().Match<ServerError>(serverError =>
            serverError.Status == statusCode
            && serverError.Message == message
            && serverError.Title == title
            && serverError.Type == type);
    }
}
