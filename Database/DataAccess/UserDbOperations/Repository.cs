using Giveaway.Database.Persistence.Entities;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Users;
using Microsoft.EntityFrameworkCore;
using SoftwareCraft.Functional;

namespace Giveaway.Database.DataAccess.UserDbOperations;

public sealed class Repository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var userEntity = await _dbContext.Users
            .Where(user => user.Email == email)
            .SingleOrDefaultAsync(cancellationToken);

        if (userEntity is null)
            return new ForbiddenError($"User onboarding issue for email {email}")
                .AsError<User, ForbiddenError>();

        return new User(new UserId(userEntity.Id),
            new UserInformation(new UserEmail(userEntity.Email),
            new UserName(userEntity.Name),
            new UserImage(userEntity.Image))).AsSuccess<User, ForbiddenError>();
    }

    public async Task CreateAsync(User user, CancellationToken cancellationToken)
    {
        await _dbContext.Users.AddAsync(new UserEntity
        {
            Id = user.Id.Value,
            Email = user.Information.Email.Value,
            Name = user.Information.Name.Value,
            Image = user.Information.Image.Value,
        }, cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
