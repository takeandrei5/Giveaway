using AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.UnitTests.Helpers;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Database.DataAccess.ItemDbOperations;
using Giveaway.Database;
using Giveaway.Application.Interfaces;
using Moq;

namespace Giveaway.Database.UnitTests.ItemDbOperations.RepositoryTests;

public class Base : IDisposable
{
    protected readonly AppDbContext         _dbContext;
    protected readonly Fixture              _fixture;
    protected readonly Mock<ILoggedUser>    _loggedUserMock;
    protected readonly Repository           _sut;

    public Base()
    {
        _fixture = new Fixture();
        _loggedUserMock = new();
        _dbContext = DatabaseExtensions.SetupDatabase(_loggedUserMock.Object);

        _sut = new Repository(_dbContext);
    }

    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    protected async Task SetupDatabase(IEnumerable<ItemEntity> items, IEnumerable<ListingEntity> listings, IEnumerable<UserEntity> users)
    {
        await Task.WhenAll(
            _dbContext.Users.AddRangeAsync(users),
            _dbContext.Listings.AddRangeAsync(listings),
            _dbContext.Items.AddRangeAsync(items));

        await _dbContext.SaveChangesAsync();
    }
}
