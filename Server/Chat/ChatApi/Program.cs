using Giveaway.Chat.ChatApi.Extensions;
using Giveaway.Chat.ChatApi.Hubs.PrivateChat;
using Giveaway.Chat.Database;
using Giveaway.Commons.Extensions;
using Giveaway.Commons.Services;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// ChatApiServices
builder.Services.AddApplicationServices();

// UseCases
builder.Services.AddApplicationUseCases();

// Readers & Repositories
builder.Services.AddReaders();
builder.Services.AddRepositories();

// Automapper
builder.Services.AddAutoMapperProfiles();

builder.Services.AddControllers();

builder.Services.AddAuthenticationAndAuthorization(configuration["AUTH0_DOMAIN"], configuration["AUTH0_AUDIENCE"]);
builder.Services.AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<HttpContextLoggedUser>();

builder.Services.Configure<ChatDatabaseSettings>(builder.Configuration.GetSection("ChatDatabase"));

var app = builder.Build();

app.UseRouting();

app.Use(async (context, next) =>
{
    var qs = context.Request.QueryString;

    if (string.IsNullOrWhiteSpace(context.Request.Headers["Authorization"]) && qs.HasValue)
    {
        var token = (from pair in qs.Value.TrimStart('?').Split('&')
                     where pair.StartsWith("access_token=")
                     select pair[6..]).FirstOrDefault();

        if (!string.IsNullOrWhiteSpace(token))
        {
            context.Request.Headers.Add("Authorization", "Bearer " + token);
        }
    }

    await next?.Invoke();
});

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireAuthorization();
    endpoints.MapHub<PrivateChatHub>("/privateChat").RequireAuthorization();
});

app.Run();
