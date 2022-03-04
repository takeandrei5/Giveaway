using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Interfaces;

namespace Giveaway.Database.DataAccess.UserDbOperations;

public sealed class Repository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<User> FindUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var userEntity = await _dbContext.Users
            .Where(x => x.Email == email)
            .SingleOrDefaultAsync(cancellationToken);

        if (userEntity == null)
            throw new Exception($"User onboarding issue for email {email}");

        return new User(new UserId(userEntity.Id), new UserName(userEntity.Name), new UserEmail(userEntity.Email));
    }
}
