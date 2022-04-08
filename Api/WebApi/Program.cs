using Giveaway.Database;
using Giveaway.WebApi.Extensions;
using Giveaway.WebApi.Filters;
using Giveaway.WebApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// WebApiServices
builder.Services.AddApplicationServices();

// UseCases
builder.Services.AddApplicationUseCases();
builder.Services.AddReaders();
builder.Services.AddRepositories();
builder.Services.AddAutoMapperProfiles();

// DatabaseContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddHttpClient("Auth0", httpClient =>
{
    httpClient.BaseAddress = new Uri(configuration["Authentication:Auth0:Domain"]);

    httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = configuration["Authentication:Auth0:Domain"];
            options.Audience = configuration["Authentication:Auth0:Audience"];

            options.SaveToken = true;

            options.Events = new JwtBearerEvents()
            {
                OnTokenValidated = async context =>
                {
                    var currentIdentity = context.Principal!.Identities.First();

                    if (!currentIdentity.IsAuthenticated)
                        throw new InvalidOperationException("Current user is not authenticated.");

                    var accessToken = (JwtSecurityToken)context.SecurityToken;

                    var httpClient = new HttpClient
                    {
                        BaseAddress = new Uri(configuration["Authentication:Auth0:Domain"]),
                    };

                    httpClient.DefaultRequestHeaders.Add(HeaderNames.Authorization, $"Bearer {accessToken.RawData}");
                    httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");

                    var response = await httpClient.GetFromJsonAsync<UserInfoModel>("userinfo", CancellationToken.None);

                    if (response is null)
                        throw new InvalidOperationException("Failed fetching user information.");

                    currentIdentity.AddClaims(new Claim[]
                    {
                        new(ClaimTypes.Email, response.Email),
                        new(ClaimTypes.Name, response.Name),
                        new(ClaimTypes.Uri, response.Picture)
                    });
                }
            };
        });

builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

if (builder.Environment.IsDevelopment())
    builder.Services.AddSwagger(configuration["Authentication:Auth0:Domain"], configuration["Authentication:Auth0:Audience"]);

builder.Services.AddControllers(options =>
            options.Filters.Add<GenericExceptionFilter>());

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

app.UseEndpoints(endpoints =>
    endpoints.MapControllers()
        .RequireAuthorization());

app.Run();