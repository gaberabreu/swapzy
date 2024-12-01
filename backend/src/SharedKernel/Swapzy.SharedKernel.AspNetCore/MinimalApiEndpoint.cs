using Microsoft.AspNetCore.Routing;

namespace Swapzy.SharedKernel.AspNetCore;

public abstract class MinimalApiEndpoint
{
    public abstract void Define(IEndpointRouteBuilder builder);
}
