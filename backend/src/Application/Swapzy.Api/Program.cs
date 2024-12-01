using System.Reflection;
using FluentValidation;
using MediatR;
using Swapzy.Api.Middlewares;
using Swapzy.Application;
using Swapzy.Infra.CrossCutting.Constants;
using Swapzy.Infra.Data.Context;
using Swapzy.Infra.Extensions;
using Swapzy.Infra.Log.Extensions;
using Swapzy.SharedKernel;
using Swapzy.SharedKernel.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Host.AddSerilog();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddValidatorsFromAssembly(typeof(IApplicationMarker).Assembly);

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(IApplicationMarker).Assembly);
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

var connectionString = builder.Configuration.GetValue<string>(ConfigurationKeys.SqlServerConnectionString);
builder.Services.AddDbContext(connectionString);

builder.Services.AddHealthChecks()
    .AddDbContextCheck<SwapzyContext>();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddProblemDetails();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.RegisterEndpoints(Assembly.GetExecutingAssembly());

app.MapHealthChecks("/health");

app.UseExceptionHandler();

app.Run();
