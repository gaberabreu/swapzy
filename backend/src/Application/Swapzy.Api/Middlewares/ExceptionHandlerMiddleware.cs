using System.Text;
using Ardalis.Result;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Swapzy.Api.Middlewares;

public class GlobalExceptionHandler() : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var problemDetails = new ProblemDetails
        {
            Instance = httpContext.Request.Path
        };

        if (exception is ValidationException fluentException)
        {
            problemDetails.Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1";
            problemDetails.Title = "Bad Request.";
            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

            var validationErrors = new List<string>();

            foreach (var error in fluentException.Errors)
            {
                validationErrors.Add(error.ErrorMessage);
            }

            problemDetails.Detail = FormatErrorDetails(validationErrors).ToString();
        }
        else
        {
            problemDetails.Title = exception.Message;
        }

        problemDetails.Status = httpContext.Response.StatusCode;
        
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken).ConfigureAwait(false);
        
        return true;
    }

    private static StringBuilder FormatErrorDetails(IEnumerable<string> errors)
    {
        var details = new StringBuilder();

        if (errors.Any())
        {
            details.Append("Next error(s) occurred:");

            foreach (var error in errors)
            {
                details.Append("* ").Append(error).AppendLine();
            }
        }
        else
        {
            details.Append("No specific details provided.");
        }

        return details;
    }
}
