using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.CreateListing;
using Giveaway.Database;
using Giveaway.Domain.Interfaces;
using Giveaway.Extensions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Giveaway.Application.UnitTests.UseCases.CreateListingTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IListingRepository> _listingRepositoryMock;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserRepository> _userRepositoryMock;

    protected string Email { get; init; }

    public Base()
    {
        _fixture = new();
        _listingRepositoryMock = new();
        _loggedUserMock = new();
        _userRepositoryMock = new();

        _sut = new(_loggedUserMock.Object, _listingRepositoryMock.Object, _userRepositoryMock.Object);

        Email = _fixture.CreateEmail();
    }

    protected void Initialize()
    {
        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);

        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(_fixture.CreateUser());
    }
}
