using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.CreateListing;
using Giveaway.Database;
using Giveaway.Domain.Interfaces;
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
    protected readonly Fixture                  _fixture;
    protected readonly Mock<IItemRepository>    _itemRepositoryMock;
    protected readonly Mock<IListingRepository> _listingRepositoryMock;
    protected readonly Mock<ILoggedUser>        _loggedUserMock;
    protected readonly Command                  _sut;
    protected readonly Mock<IUserRepository>    _userRepositoryMock;

    public Base()
    {
        _fixture = new Fixture();
        _itemRepositoryMock = new Mock<IItemRepository>();
        _listingRepositoryMock = new Mock<IListingRepository>();
        _loggedUserMock = new Mock<ILoggedUser>();
        _userRepositoryMock = new Mock<IUserRepository>();

        _sut = new Command(_loggedUserMock.Object, _itemRepositoryMock.Object, _listingRepositoryMock.Object, _userRepositoryMock.Object);
    }

    protected void Initialize() =>
        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(_fixture.CreateUser());
}
