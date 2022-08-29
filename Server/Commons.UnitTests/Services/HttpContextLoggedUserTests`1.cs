using System.Security.Claims;
using FluentAssertions;
using Helpers;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace Commons.UnitTests.Services;

public sealed class HttpContextLoggedUserTests_1 : Base
{
    [Fact(DisplayName = "GetEmailFromClaims throws ArgumentException if no email could be read from claims principal.")]
    public void GetEmailFromClaims_Throws_ArgumentException_If_No_Email_Could_Be_Read_From_Claims_Principals()
    {
        // Arrange
        _httpContextAccessor.Setup(httpContextAccessor => httpContextAccessor.HttpContext)
           .Returns(() => new DefaultHttpContext
            {
                User = new ClaimsPrincipal()
            });

        // Act
        var act = () => _sut.GetEmailFromClaims();

        // Assert
        act.Should()
           .Throw<ArgumentException>("Could not fetch email from claims.");
    }

    [Fact(DisplayName = "GetEmailFromClaims returns email from the current user identity successfully.")]
    public void GetEmailFromClaims_Returns_Email_From_The_Current_User_Identity_Successfully()
    {
        // Act
        var email = _fixture.CreateEmail();

        _httpContextAccessor.Setup(httpContextAccessor => httpContextAccessor.HttpContext)
           .Returns(() =>
            {
                ClaimsIdentity claimsIdentity =
                    new(new[]
                    {
                        new Claim(ClaimTypes.Email, email)
                    });

                return new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(claimsIdentity)
                };
            });

        // Arrange
        var result = _sut.GetEmailFromClaims();

        // Assert
        result.Should()
           .Be(email);
    }
}
