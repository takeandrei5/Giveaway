using Giveaway.Commons.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Giveaway.Commons.Filters;

internal class DomainRuleExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception.GetType() != typeof(DomainRuleException))
            return;

        context.Result = HandleDomainRuleException(context.Exception.Message);
        context.ExceptionHandled = true;
    }

    private static ObjectResult HandleDomainRuleException(string message) => new(new ProblemDetails
    {
        Status = StatusCodes.Status400BadRequest,
        Title = message,
        Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
    });
}
