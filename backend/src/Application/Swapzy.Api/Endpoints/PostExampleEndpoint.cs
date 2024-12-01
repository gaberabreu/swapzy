using MediatR;
using Swapzy.Application.Commands;
using Swapzy.SharedKernel.AspNetCore;

namespace Swapzy.Api.Endpoints;

public class PostExampleEndpoint : MinimalApiEndpoint
{
    public override void Define(IEndpointRouteBuilder builder)
    {
        builder.MapPost("/Example", HandleAsync)
            .WithOpenApi()
            .WithTags("Example");
    }

    private async Task<IResult> HandleAsync(IMediator mediator, CancellationToken cancellationToken)
    {
        var command = new ExampleCommand(2);
        var result = await mediator.Send(command, cancellationToken);
        return result.ToMinimalApiResult();
    }
}