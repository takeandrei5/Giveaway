using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.CreateListing;
using Giveaway.Domain.Interfaces;
using Helpers;
using Moq;

namespace Giveaway.Application.UnitTests.UseCases.Listings.CreateListingTests;

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
}
