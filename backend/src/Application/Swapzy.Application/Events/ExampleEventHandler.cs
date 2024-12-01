using MediatR;
using Swapzy.Domain.Events;

namespace Swapzy.Application.Events;

public class ExampleEventHandler : INotificationHandler<ExampleEvent>
{
    public Task Handle(ExampleEvent notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
