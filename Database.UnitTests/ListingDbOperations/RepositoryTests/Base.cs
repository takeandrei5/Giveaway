using AutoFixture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.UnitTests.Helpers;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Database.DataAccess.ListingDbOperations;
using Giveaway.Database;

namespace Giveaway.Database.UnitTests.ListingDbOperations.RepositoryTests;

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

    protected async Task SetupDatabase(IEnumerable<UserEntity> users)
    {
        await _dbContext.Users.AddRangeAsync(users);

        await _dbContext.SaveChangesAsync();
    }

    protected async Task SetupDatabase(IEnumerable<ListingEntity> listings, IEnumerable<UserEntity> users)
    {
        await Task.WhenAll(_dbContext.Listings.AddRangeAsync(listings),
            _dbContext.Users.AddRangeAsync(users));

        await _dbContext.SaveChangesAsync();
    }
}
