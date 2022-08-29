using System.Security.Claims;
using FluentAssertions;
using Helpers;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace Commons.UnitTests.Services;

public sealed class HttpContextLoggedUserTests_3 : Base
{
    [Fact(DisplayName = "GetImageFromClaims throws ArgumentException if no image could be read from claims principal.")]
    public void GetImageFromClaims_Throws_ArgumentException_If_No_Image_Could_Be_Read_From_Claims_Principals()
    {
        // Arrange
        _httpContextAccessor.Setup(httpContextAccessor => httpContextAccessor.HttpContext)
            .Returns(() => new DefaultHttpContext
            {
                User = new ClaimsPrincipal()
            });

        // Act
        var act = () => _sut.GetImageFromClaims();

        // Assert
        act.Should()
            .Throw<ArgumentException>("Could not fetch image from claims.");
    }

    [Fact(DisplayName = "GetImageFromClaims returns image url from the current user identity successfully.")]
    public void GetImageFromClaims_Returns_Image_Url_From_The_Current_User_Identity_Successfully()
    {
        // Act
        var imageUrl = _fixture.CreateUrl();

        _httpContextAccessor.Setup(httpContextAccessor => httpContextAccessor.HttpContext)
            .Returns(() =>
            {
                ClaimsIdentity claimsIdentity =
                    new(new[]
                    {
                        new Claim(ClaimTypes.Uri, imageUrl)
                    });

                return new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(claimsIdentity)
                };
            });

        // Arrange
        var result = _sut.GetImageFromClaims();

        // Assert
        result.Should()
            .Be(imageUrl);
    }
}
