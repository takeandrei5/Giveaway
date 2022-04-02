using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.ReadListingById;
using Giveaway.Application.UseCases.ReadListingById.Models;
using Giveaway.Database;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Giveaway.Application.UnitTests.UseCases.ReadListingByIdTests;

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
