using AutoFixture;
using Giveaway.Web.Application.Interfaces;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings;
using Moq;

namespace Giveaway.Web.Application.UnitTests.UseCases.Listings.ReadAllListingsTests;

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
