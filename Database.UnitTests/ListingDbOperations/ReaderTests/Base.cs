using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Database.DataAccess.ListingDbOperations;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Database.UnitTests.Helpers;
using Helpers;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ReaderTests;

public class Base : AutoMapperFixture, IDisposable
{
    protected readonly AppDbContext _dbContext;
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Reader _sut;

    public Base()
    {
        _fixture = new Fixture();
        _loggedUserMock = new();
        _dbContext = DatabaseExtensions.SetupDatabase(_loggedUserMock.Object);

        _sut = new Reader(_dbContext, Mapper);
    }

    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    protected async Task SetupDatabase(IEnumerable<ImageEntity> images, IEnumerable<ListingEntity> listings,
        IEnumerable<UserEntity> users)
    {
        await Task.WhenAll(
            _dbContext.Images.AddRangeAsync(images),
            _dbContext.Listings.AddRangeAsync(listings),
            _dbContext.Users.AddRangeAsync(users));

        await _dbContext.SaveChangesAsync();
    }
}