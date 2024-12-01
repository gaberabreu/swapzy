using Ardalis.Result;
using Swapzy.SharedKernel;

namespace Swapzy.Application.Queries;

public class ExampleQuery : IQuery<Result<int>>;

public class ExampleQueryHandler : IQueryHandler<ExampleQuery, Result<int>>
{
    public Task<Result<int>> Handle(ExampleQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(Result.Success(1));
    }
}
