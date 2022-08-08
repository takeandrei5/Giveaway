using Ductus.FluentDocker.Builders;
using Ductus.FluentDocker.Extensions;
using Ductus.FluentDocker.Services;
using Ductus.FluentDocker.Services.Extensions;

namespace Helpers;

public class DockerSqlIntegrationFixture : IDisposable
{
    private static IContainerService _containerService;

    static DockerSqlIntegrationFixture() => SetupDocker();

    public void Dispose()
    {
        GC.SuppressFinalize(this);
        _containerService.Dispose();
    }

    private static void SetupDocker()
    {
        _containerService = new Builder()
           .UseContainer()
            // .UseImage("mcr.microsoft.com/mssql/server") // for others
           .UseImage("mcr.microsoft.com/azure-sql-edge") // for ARM
           .WithName("sql-docker-integration-test-container")
           .ReuseIfExists()
           .ExposePort(1433)
           .WithEnvironment("SA_PASSWORD=sa_password_123", "ACCEPT_EULA=Y")
           .Build()
           .Start();
        
        // todo - find why it does not work without Thread sleep
        Thread.Sleep(10000);
    }

    public static string GetHostPort() => _containerService.GetConfiguration().NetworkSettings.Ports
       .Where(p => p.Key.Contains("1433/tcp")).First().Value[0].HostPort;
}
