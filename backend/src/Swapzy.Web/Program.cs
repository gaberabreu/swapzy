using Swapzy.Infrastructure;
using Swapzy.Web.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Host.AddLoggerConfigs();

builder.Services.AddControllers();

builder.Services.AddIdentityConfigs()
    .AddMediatrConfigs()
    .AddFluentValidationConfigs()
    .AddSwaggerConfigs()
    .AddInfrastructureServices();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerConfigs();
}

app.MapControllers();

app.UseIdentityConfigs();

app.MapHealthChecks("/health");

app.UseCors("AllowAllOrigins");

await app.RunAsync();
