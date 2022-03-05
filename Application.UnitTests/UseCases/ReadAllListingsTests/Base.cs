using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.ReadAllListings;
using Giveaway.Application.UseCases.ReadAllListings.Models;
using Giveaway.Database;
using Giveaway.Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Giveaway.Application.UnitTests.UseCases.ReadAllListingsTests;

public class Base
{
    protected readonly Fixture                  _fixture;
    protected readonly Mock<IListingReader>     _listingReaderMock;
    protected readonly Command                  _sut;

    public Base()
    {
        _fixture = new Fixture();
        _listingReaderMock = new Mock<IListingReader>();

        _sut = new Command(_listingReaderMock.Object);
    }

    protected void Initialize() =>
        _listingReaderMock.Setup(listingReader => listingReader.ReadAllListings(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Enumerable.Empty<ListingReadModel>);
}
