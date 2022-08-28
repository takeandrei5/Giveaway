using System.Security.Claims;
using AutoFixture;
using FluentAssertions;
using Giveaway.Commons.Extensions;
using Helpers;
using Moq;
using Xunit;

namespace Commons.UnitTests.Extensions;

public sealed class ClaimsPrincipalExtensionsTests
{
    private readonly Mock<ClaimsPrincipal> _sut = new();
    private readonly Fixture _fixture = new();

    [Fact(DisplayName = "GetEmail should return Maybe.None if no email claim is found.")]
    public void GetEmail_Should_Return_Maybe_None_If_No_Email_Claim_Is_Found()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(Array.Empty<Claim>());

        // Act
        var result = _sut.Object.GetEmail();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetEmail should return Maybe.None if email claim is found but it empty string.")]
    public void GetEmail_Should_Return_Maybe_None_If_Email_Claim_Is_Found_But_It_Is_Empty_String()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Email, string.Empty)
            });

        // Act
        var result = _sut.Object.GetEmail();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetEmail should return Maybe.None if email claim is found but it is whitespace.")]
    public void GetEmail_Should_Return_Maybe_None_If_Email_Claim_Is_Found_But_It_Is_Whitespace()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Email, " \r\n")
            });

        // Act
        var result = _sut.Object.GetEmail();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }
    
    [Fact(DisplayName = "GetEmail should return Maybe.Some if email claim is found and it has correct value.")]
    public void GetEmail_Should_Return_Maybe_None_If_Email_Claim_Is_Found_And_It_Has_Correct_Value()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Email, _fixture.CreateEmail())
            });

        // Act
        var result = _sut.Object.GetEmail();

        // Assert
        result.IsSome.Should()
           .BeTrue();
    }
    
    [Fact(DisplayName = "GetName should return Maybe.None if no name claim is found.")]
    public void GetName_Should_Return_Maybe_None_If_No_Name_Claim_Is_Found()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(Array.Empty<Claim>());

        // Act
        var result = _sut.Object.GetName();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetName should return Maybe.None if name claim is found but it empty string.")]
    public void GetName_Should_Return_Maybe_None_If_Name_Claim_Is_Found_But_It_Is_Empty_String()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Name, string.Empty)
            });

        // Act
        var result = _sut.Object.GetName();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetName should return Maybe.None if name claim is found but it is whitespace.")]
    public void GetName_Should_Return_Maybe_None_If_Nane_Claim_Is_Found_But_It_Is_Whitespace()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Name, " \r\n")
            });

        // Act
        var result = _sut.Object.GetName();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }
    
    [Fact(DisplayName = "GetName should return Maybe.Some if name claim is found and it has correct value.")]
    public void GetName_Should_Return_Maybe_None_If_Name_Claim_Is_Found_And_It_Has_Correct_Value()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Name, _fixture.Create<string>())
            });

        // Act
        var result = _sut.Object.GetName();

        // Assert
        result.IsSome.Should()
           .BeTrue();
    }
    
    [Fact(DisplayName = "GetImage should return Maybe.None if no uri claim is found.")]
    public void GetImage_Should_Return_Maybe_None_If_No_Uri_Claim_Is_Found()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(Array.Empty<Claim>());

        // Act
        var result = _sut.Object.GetImage();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetImage should return Maybe.None if uri claim is found but it empty string.")]
    public void GetImage_Should_Return_Maybe_None_If_Uri_Claim_Is_Found_But_It_Is_Empty_String()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Uri, string.Empty)
            });

        // Act
        var result = _sut.Object.GetImage();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }

    [Fact(DisplayName = "GetImage should return Maybe.None if uri claim is found but it is whitespace.")]
    public void GetImage_Should_Return_Maybe_None_If_Uri_Claim_Is_Found_But_It_Is_Whitespace()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Uri, " \r\n")
            });

        // Act
        var result = _sut.Object.GetImage();

        // Assert
        result.IsNone.Should()
           .BeTrue();
    }
    
    [Fact(DisplayName = "GetImage should return Maybe.Some if uri claim is found and it has correct value.")]
    public void GetImage_Should_Return_Maybe_None_If_Uri_Claim_Is_Found_And_It_Has_Correct_Value()
    {
        // Arrange
        _sut.SetupGet(property => property.Claims)
           .Returns(new Claim[]
            {
                new(ClaimTypes.Uri, _fixture.CreateUrl())
            });

        // Act
        var result = _sut.Object.GetImage();

        // Assert
        result.IsSome.Should()
           .BeTrue();
    }
}
