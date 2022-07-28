using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;

namespace Giveaway.Commons.Filters;

internal class GenericExceptionFilter : IExceptionFilter
{
    private readonly IHostEnvironment _hostEnvironment;

    public GenericExceptionFilter(IHostEnvironment hostEnvironment) => _hostEnvironment = hostEnvironment;

    public void OnException(ExceptionContext context)
    {
        if (_hostEnvironment.IsDevelopment()) return;

        context.Result = HandleServerErrorException();
        context.ExceptionHandled = true;
    }

    private static ObjectResult HandleServerErrorException() => new(new ProblemDetails
    {
        Status = StatusCodes.Status500InternalServerError,
        Title = "An error happened whilst the server was processing your request *beep boop*.",
        Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
    });
}
