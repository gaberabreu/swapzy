using Microsoft.Extensions.Hosting;
using Serilog;

namespace Swapzy.Infra.Log.Extensions;

public static class SerilogHostBuilderExtensions
{
    public static IHostBuilder AddSerilog(this IHostBuilder hostBuilder)
    {
        var logger = new LoggerConfiguration()
          .WriteTo.Console(
            outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message}{NewLine}{Exception}")
          .CreateLogger();

        hostBuilder.UseSerilog(logger);

        return hostBuilder;
    }
}
