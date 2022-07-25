using Giveaway.Commons.Extensions;
using Giveaway.Commons.Filters;
using Giveaway.Database;
using Giveaway.Web.Database;
using Giveaway.Web.WebApi.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

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
    httpClient.BaseAddress = new Uri(configuration["AUTH0_DOMAIN"]);

    httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
});

builder.Services.AddAuthenticationAndAuthorization(configuration["AUTH0_DOMAIN"], configuration["AUTH0_AUDIENCE"]);
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

if (builder.Environment.IsDevelopment())
    builder.Services.AddSwagger(configuration["AUTH0_DOMAIN"], configuration["AUTH0_AUDIENCE"]);

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
        swaggerUiOptions.OAuthClientId(configuration["AUTH0_CLIENT_ID"]);
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
