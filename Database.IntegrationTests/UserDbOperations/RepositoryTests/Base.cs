using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Database.DataAccess.UserDbOperations;
using Giveaway.Database.IntegrationTests.Helpers;
using Giveaway.Database.Persistence.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Giveaway.Database.IntegrationTests.UserDbOperations.RepositoryTests;

public class Base : IDisposable
{
    protected readonly AppDbContext _dbContext;
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Repository _sut;

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

    protected async Task SetupDatabase(IEnumerable<UserEntity> users)
    {
        await _dbContext.Users.AddRangeAsync(users);

        await _dbContext.SaveChangesAsync();
    }
}
