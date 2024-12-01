using Ardalis.Result;
using FluentValidation;
using MediatR;
using Swapzy.Domain.Events;
using Swapzy.SharedKernel;

namespace Swapzy.Application.Commands;

public record ExampleCommand(int Value) : ICommand<Result<int>>;

public class ExampleCommandValidator : AbstractValidator<ExampleCommand>
{
    public ExampleCommandValidator()
    {
        RuleFor(command => command.Value)
            .NotEmpty()
            .WithMessage("The value can't be empty");
    }
}

public class ExampleCommandHandler(IMediator mediator) : ICommandHandler<ExampleCommand, Result<int>>
{
    public async Task<Result<int>> Handle(ExampleCommand request, CancellationToken cancellationToken)
    {
        await mediator.Publish(new ExampleEvent(), cancellationToken);

        if (request.Value == 1)
            return Result.Success(1);

        return Result.Error("Some error"); 
    }
}
