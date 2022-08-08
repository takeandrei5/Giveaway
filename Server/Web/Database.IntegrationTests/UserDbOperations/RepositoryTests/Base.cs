using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Giveaway.Commons.Interfaces;
using Giveaway.Database;
using Giveaway.Web.Database.DataAccess.UserDbOperations;
using Giveaway.Web.Database.IntegrationTests.Helpers;
using Giveaway.Web.Database.Persistence.Entities;
using Helpers;
using Moq;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.UserDbOperations.RepositoryTests;

[Collection("Database collection")]
public class Base : IDisposable
{
    protected readonly AppDbContext _dbContext;
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Repository _sut;

    protected Base()
    {
        _fixture = new Fixture();
        _loggedUserMock = new();
        _dbContext = DatabaseExtensions.SetupDatabase(_loggedUserMock.Object);

        _sut = new Repository(_dbContext);
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
        
        _dbContext.Database.EnsureDeleted();
        _dbContext.Dispose();
    }

    protected async Task SetupDatabase(IEnumerable<UserEntity> users)
    {
        await _dbContext.Users.AddRangeAsync(users);

        await _dbContext.SaveChangesAsync();
    }
}
