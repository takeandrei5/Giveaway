using AutoFixture;
using Database.DataAccess.ItemDbOperations;
using Database.Persistence.Entities;
using Database.UnitTests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.UnitTests.ItemDbOperations.ReaderTests;

public class Base : IDisposable
{
    protected readonly AppDbContext _dbContext;
    protected readonly Fixture _fixture;
    protected readonly Repository _sut;

    public Base()
    {
        _dbContext = DatabaseExtensions.SetupDatabase();

        _fixture = new Fixture();
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
