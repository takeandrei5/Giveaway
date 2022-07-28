using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Giveaway.Commons.Interfaces;
using Giveaway.Web.Database.DataAccess.ListingDbOperations;
using Giveaway.Web.Database.IntegrationTests.Helpers;
using Giveaway.Web.Database.Persistence.Entities;
using Helpers;
using Moq;

namespace Giveaway.Web.Database.IntegrationTests.ListingDbOperations.ReaderTests;

public class Base : AutoMapperFixture, IDisposable
{
    private readonly AppDbContext _dbContext;
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Reader _sut;

    protected Base() : base("Giveaway.Web.Database")
    {
        _fixture = new Fixture();
        _loggedUserMock = new Mock<ILoggedUser>();
        _dbContext = DatabaseExtensions.SetupDatabase(_loggedUserMock.Object);

        _sut = new Reader(_dbContext, Mapper);
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);

        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    protected async Task SetupDatabase(IEnumerable<ImageEntity> images, IEnumerable<ListingEntity> listings,
        IEnumerable<UserEntity> users)
    {
        await Task.WhenAll(_dbContext.Images.AddRangeAsync(images),
            _dbContext.Listings.AddRangeAsync(listings),
            _dbContext.Users.AddRangeAsync(users));

        await _dbContext.SaveChangesAsync();
    }
}
