using AutoFixture;
using FluentAssertions;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Giveaway.Extensions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Database.UnitTests.UserDbOperations.RepositoryTests;

public sealed class CreateAsync_1 : Base
{
    [Fact(DisplayName = "CreateAsync inserts UserEntity successfully.")]
    public async Task CreateAsync_Inserts_UserEntity_Successfully()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(2)
            .ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));

        // Act
        await _sut.CreateAsync(user, It.IsAny<CancellationToken>());

        // Assert
        _dbContext.Users
            .Where(userEntity => userEntity.Id == user.Id.Value)
            .Count()
            .Should()
            .Be(1);
    }
}
