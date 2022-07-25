using Giveaway.Chat.ChatApi.Extensions;
using Giveaway.Chat.ChatApi.Hubs.PrivateChat;
using Giveaway.Chat.Database;
using Giveaway.Chat.Database.DataAccess;
using Giveaway.Commons.Extensions;
using Giveaway.Commons.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// WebApiServices
builder.Services.AddApplicationServices();

// UseCases
builder.Services.AddApplicationUseCases();
builder.Services.AddServices();
builder.Services.AddAutoMapperProfiles();

builder.Services.AddControllers();

builder.Services.AddAuthenticationAndAuthorization(configuration["AUTH0_DOMAIN"], configuration["AUTH0_AUDIENCE"]);
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials();
    });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<HttpContextLoggedUser>();

builder.Services.Configure<ChatDatabaseSettings>(builder.Configuration.GetSection("ChatDatabase"));

builder.Services.AddSingleton<MessageService>();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<PrivateChatHub>("/privateChat").RequireAuthorization(JwtBearerDefaults.AuthenticationScheme);
    endpoints.MapControllers();
});

app.Run();
