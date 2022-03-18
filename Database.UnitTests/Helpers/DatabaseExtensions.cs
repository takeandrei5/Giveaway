using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database;
using Giveaway.Application.Interfaces;

namespace Giveaway.Database.UnitTests.Helpers;

public static class DatabaseExtensions
{
    public static AppDbContext SetupDatabase(ILoggedUser loggedUser)
    {
        var sqlConnectionStringBuilder = new SqlConnectionStringBuilder
        {
            DataSource = $"localhost",
            UserID = "sa",
            Password = "admin",
            InitialCatalog = "GiveawayDbApp" + Guid.NewGuid().ToString("N"),
            MultipleActiveResultSets = true
        };

        var dbContextOptionsBuilder =
            new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(sqlConnectionStringBuilder.ConnectionString,
                    options => options.EnableRetryOnFailure(10, TimeSpan.FromSeconds(30), null));

        var context = new AppDbContext(dbContextOptionsBuilder.Options, loggedUser);

        context!.Database.Migrate();

        return context;
    }
}
