using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.ReadListingById;
using Giveaway.Domain.Interfaces;
using Moq;

namespace Giveaway.Application.UnitTests.UseCases.Listings.ReadListingByIdTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IListingReader> _listingReaderMock;
    protected readonly Mock<IListingRepository> _listingRepositoryMock;
    protected readonly Command _sut;

    public Base()
    {
        _fixture = new Fixture();
        _listingReaderMock = new Mock<IListingReader>();
        _listingRepositoryMock = new Mock<IListingRepository>();

        _sut = new Command(_listingReaderMock.Object, _listingRepositoryMock.Object);
    }
}
