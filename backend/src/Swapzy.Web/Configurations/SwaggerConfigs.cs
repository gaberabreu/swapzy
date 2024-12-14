namespace Swapzy.Web.Configurations;

public static class SwaggerConfigs
{
    public static IServiceCollection AddSwaggerConfigs(this IServiceCollection services)
    {
        return services.AddOpenApi();
    }

    public static WebApplication UseSwaggerConfigs(this WebApplication app)
    {
        app.MapOpenApi();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/openapi/v1.json", "v1");
        });

        return app;
    }
}
