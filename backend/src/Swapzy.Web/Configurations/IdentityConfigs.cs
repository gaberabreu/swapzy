using Swapzy.Core.UserAggregate;
using Swapzy.Infrastructure.Data;

namespace Swapzy.Web.Configurations;

public static class IdentityConfigs
{
    public static IServiceCollection AddIdentityConfigs(this IServiceCollection services)
    {
        services.AddIdentityApiEndpoints<ApplicationUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        return services;
    }

    public static WebApplication UseIdentityConfigs(this WebApplication app)
    {
        app.MapIdentityApi<ApplicationUser>();

        return app;
    }
}