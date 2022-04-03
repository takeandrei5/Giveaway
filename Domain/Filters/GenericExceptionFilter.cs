using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Filters;

internal class GenericExceptionFilter : IExceptionFilter
{
    private readonly IHostEnvironment _hostEnvironment;

    public GenericExceptionFilter(IHostEnvironment hostEnvironment) => _hostEnvironment = hostEnvironment;

    public void OnException(ExceptionContext context)
    {
        if (_hostEnvironment.IsDevelopment()) return;

        context.Result = ServerErrorException(context);
        context.ExceptionHandled = true;
    }

    private static ObjectResult ServerErrorException(ExceptionContext context) =>
        new(new ProblemDetails
        {
            Instance = context.HttpContext.Request.Path,
            Status = StatusCodes.Status500InternalServerError,
            Title = "A server error occurred whilst treating your request *beep boop*.",
            Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
        });
}