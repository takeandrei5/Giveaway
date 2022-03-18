using Microsoft.EntityFrameworkCore;
using Giveaway.Database;
using Giveaway.WebApi.Extensions;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Giveaway.WebApi.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.OAuth;
using Auth0.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// WebApiServices
builder.Services.AddApplicationServices();

// UseCases
builder.Services.AddApplicationUseCases();
builder.Services.AddRepositories();
builder.Services.AddAutoMapperProfiles();

// DatabaseContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = configuration["Authentication:Auth0:Domain"];
            options.Audience = configuration["Authentication:Auth0:Audience"];
        });

builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSwagger(configuration["Authentication:Auth0:Domain"], configuration["Authentication:Auth0:Audience"]);
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(swaggerOptions => swaggerOptions.RouteTemplate = "api/swagger/{documentname}/swagger.json");
    app.UseSwaggerUI(swaggerUiOptions =>
    {
        swaggerUiOptions.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Giveaway APIs v1");
        swaggerUiOptions.RoutePrefix = "api/swagger";
        swaggerUiOptions.OAuthClientId(configuration["Authentication:Auth0:ClientId"]);
    });
}

// Migrate Database
app.MigrateDatabase();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => endpoints.MapControllers().RequireAuthorization());

app.Run();