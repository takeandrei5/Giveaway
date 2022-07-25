using AutoFixture;
using Giveaway.Commons.Interfaces;
using Giveaway.Domain.Interfaces;
using Giveaway.Web.Application.UseCases.Listings.CreateListing;
using Helpers;
using Moq;

namespace Giveaway.Web.Application.UnitTests.UseCases.Listings.CreateListingTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IListingRepository> _listingRepositoryMock;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserRepository> _userRepositoryMock;

    protected Base()
    {
        _fixture = new Fixture();
        _listingRepositoryMock = new Mock<IListingRepository>();
        _loggedUserMock = new Mock<ILoggedUser>();
        _userRepositoryMock = new Mock<IUserRepository>();

        _sut = new Command(_loggedUserMock.Object, _listingRepositoryMock.Object, _userRepositoryMock.Object);

        Email = _fixture.CreateEmail();
    }

    protected string Email { get; init; }
}
