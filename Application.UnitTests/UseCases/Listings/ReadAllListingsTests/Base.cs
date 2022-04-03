using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.ReadAllListings;
using Moq;

namespace Giveaway.Application.UnitTests.UseCases.Listings.ReadAllListingsTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<IListingReader> _listingReaderMock;
    protected readonly Command _sut;

    public Base()
    {
        _fixture = new Fixture();
        _listingReaderMock = new Mock<IListingReader>();

        _sut = new Command(_listingReaderMock.Object);
    }
}
