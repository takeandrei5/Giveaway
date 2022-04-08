﻿using Giveaway.Database;
using Microsoft.EntityFrameworkCore;

namespace Giveaway.WebApi.Extensions;

public static class ApplicationExtensions
{
    public static void MigrateDatabase(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();

        scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
    }
}
