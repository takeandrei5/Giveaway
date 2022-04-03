using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Errors;

public abstract class BaseError
{
    public int Status { get; init; }

    public string Message { get; init; }

    public abstract string Title { get; init; }

    public abstract string Type { get; init; }

    protected BaseError(int status, string message)
    {
        Status = status;
        Message = message;
    }
}
