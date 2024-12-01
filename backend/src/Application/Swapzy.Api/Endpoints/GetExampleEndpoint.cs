using MediatR;
using Swapzy.Application.Queries;
using Swapzy.SharedKernel.AspNetCore;

namespace Swapzy.Api.Endpoints;

public class GetExampleEndpoint : MinimalApiEndpoint
{
    public override void Define(IEndpointRouteBuilder builder)
    {
        builder.MapGet("/Example", HandleAsync)
            .WithOpenApi()
            .WithTags("Example");
    }

    private async Task<IResult> HandleAsync(IMediator mediator, CancellationToken cancellationToken)
    {
        var query = new ExampleQuery();
        var result = await mediator.Send(query, cancellationToken);
        return result.ToMinimalApiResult();
    }
}
