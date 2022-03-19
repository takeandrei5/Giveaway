using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Interfaces;
using Giveaway.Database.Persistence.Entities;

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

        return new User(new UserId(userEntity.Id),
            new UserInformation(new UserEmail(userEntity.Email),
            new UserFullName(userEntity.FullName),
            new UserImage(userEntity.Image)));
    }

    public async Task CreateAsync(User user, CancellationToken cancellationToken)
    {
        await _dbContext.Users.AddAsync(new UserEntity
        {
            Id = user.Id.Value,
            Email = user.Information.Email.Value,
            FullName = user.Information.FullName.Value,
            Image = user.Information.Image.Value,
        }, cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

}
