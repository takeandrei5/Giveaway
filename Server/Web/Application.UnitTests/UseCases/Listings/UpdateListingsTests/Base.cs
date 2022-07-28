using AutoFixture;
using Giveaway.Web.Application.UseCases.Listings.UpdateListing;
using Giveaway.Web.Domain.Interfaces;
using Helpers;
using Moq;

namespace Giveaway.Web.Application.UnitTests.UseCases.Listings.UpdateListingsTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IListingRepository> _listingRepositoryMock;
    protected readonly Command _sut;

    protected string Email { get; init; }

    public Base()
    {
        _fixture = new();
        _listingRepositoryMock = new();

        _sut = new(_listingRepositoryMock.Object);

        Email = _fixture.CreateEmail();
    }
}
