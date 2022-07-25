using System.Security.Claims;
using AutoFixture;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace Commons.UnitTests.Services;

public sealed class HttpContextLoggedUserTests_2 : Base
{
    [Fact(DisplayName = "GetNameFromClaims throws ArgumentException if no name could be read from claims principal.")]
    public void GetNameFromClaims_Throws_ArgumentException_If_No_Name_Could_Be_Read_From_Claims_Principals()
    {
        // Arrange
        _httpContextAccessor.Setup(x => x.HttpContext)
           .Returns(() => new DefaultHttpContext
            {
                User = new ClaimsPrincipal()
            });

        // Act
        var act = () => _sut.GetNameFromClaims();

        // Assert
        act.Should()
           .Throw<ArgumentException>("Could not fetch name from claims.");
    }

    [Fact(DisplayName = "GetNameFromClaims returns name from the current user identity successfully.")]
    public void GetNameFromClaims_Returns_Name_From_The_Current_User_Identity_Successfully()
    {
        // Act
        var name = _fixture.Create<string>();

        _httpContextAccessor.Setup(x => x.HttpContext)
           .Returns(() =>
            {
                ClaimsIdentity claimsIdentity =
                    new(new[]
                    {
                        new Claim(ClaimTypes.Name, name)
                    });

                return new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(claimsIdentity)
                };
            });

        // Arrange
        var result = _sut.GetNameFromClaims();

        // Assert
        result.Should()
           .Be(name);
    }
}
