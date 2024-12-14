using System.Reflection;
using FluentValidation;

namespace Swapzy.Web.Configurations;

public static class FluentValidationConfigs
{
    public static IServiceCollection AddFluentValidationConfigs(this IServiceCollection services)
    {
        return services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
