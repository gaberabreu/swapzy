using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Swapzy.Infrastructure.Data;

namespace Swapzy.Infrastructure;

public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        return services.AddDbContext<ApplicationDbContext>(
            options => options.UseInMemoryDatabase("Swapzy"));
    }
}
