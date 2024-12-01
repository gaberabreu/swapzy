using MediatR;

namespace Swapzy.SharedKernel;

public interface ICommand<out TResponse> : IRequest<TResponse>;
