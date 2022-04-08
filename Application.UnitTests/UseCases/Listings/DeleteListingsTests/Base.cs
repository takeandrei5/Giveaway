using AutoFixture;
using Giveaway.Application.UseCases.Listings.DeleteListing;
using Giveaway.Domain.Interfaces;
using Helpers;
using Moq;

namespace Giveaway.Application.UnitTests.UseCases.Listings.DeleteListingsTests;

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
