using System;
using System.Diagnostics;
using System.Threading;
using Giveaway.Commons.Interfaces;
using Helpers;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Giveaway.Web.Database.IntegrationTests.Helpers;

public static class DatabaseExtensions
{
    public static AppDbContext SetupDatabase(ILoggedUser loggedUser)
    {
        var sqlConnectionStringBuilder = new SqlConnectionStringBuilder
        {
            DataSource = $"localhost, {DockerSqlIntegrationFixture.GetHostPort()}",
            UserID = "sa",
            Password = "sa_password_123",
            InitialCatalog = "GiveawayDbApp"
                             + Guid.NewGuid()
                                .ToString("N"),
            MultipleActiveResultSets = false,
            TrustServerCertificate = false,
        };

        var dbContextOptionsBuilder =
            new DbContextOptionsBuilder<AppDbContext>()
               .UseSqlServer(sqlConnectionStringBuilder.ConnectionString,
                    options => options.EnableRetryOnFailure(10, TimeSpan.FromSeconds(30), null));

        var context = new AppDbContext(dbContextOptionsBuilder.Options, loggedUser);

        context.Database.Migrate();

        return context;
    }
}
