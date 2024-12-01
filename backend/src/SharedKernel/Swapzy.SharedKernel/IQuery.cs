using MediatR;

namespace Swapzy.SharedKernel;

public interface IQuery<out TResponse> : IRequest<TResponse>;
