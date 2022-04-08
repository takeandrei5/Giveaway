using AutoFixture;
using FluentAssertions;
using Giveaway.Extensions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace WebApi.UnitTests.Services;

public sealed class HttpContextLoggedUserTests_3 : Base
{
    [Fact(DisplayName = "GetImageFromClaims throws ArgumentException if no image could be read from claims principal.")]
    public void GetImageFromClaims_Throws_ArgumentException_If_No_Image_Could_Be_Read_From_Claims_Principals()
    {
        // Arrange
        _httpContextAccessor.Setup(x => x.HttpContext)
            .Returns(() => new DefaultHttpContext
            {
                User = new()
            });

        // Act
        var act = () => _sut.GetNameFromClaims();

        // Assert
        act.Should()
            .Throw<ArgumentException>("Could not fetch image from claims.");
    }

    [Fact(DisplayName = "GetImageFromClaims returns image url from the current user identity successfully.")]
    public void GetImageFromClaims_Returns_Image_Url_From_The_Current_User_Identity_Successfully()
    {
        // Act
        // todo
        var imageUrl = "https://www.google.com";

        _httpContextAccessor.Setup(x => x.HttpContext)
            .Returns(() =>
            {
                ClaimsIdentity claimsIdentity =
                    new(new[]
                    {
                        new Claim(ClaimTypes.Uri, imageUrl)
                    });

                return new DefaultHttpContext
                {
                    User = new(claimsIdentity)
                };
            });

        // Arrange
        var result = _sut.GetImageFromClaims();

        // Assert
        result.Should()
            .Be(imageUrl);
    }
}
