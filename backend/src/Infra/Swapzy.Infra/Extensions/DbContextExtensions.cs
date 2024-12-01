using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Swapzy.Infra.Data.Context;

namespace Swapzy.Infra.Extensions;

public static class DbContextExtensions
{
    public static IServiceCollection AddDbContext(this IServiceCollection services, string? connectionString)
    {
        services.AddDbContext<SwapzyContext>(options =>
            options.UseSqlServer(connectionString));

        return services;
    }
}
