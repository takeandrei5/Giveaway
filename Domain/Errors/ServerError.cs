using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Errors;

public sealed class ServerError : BaseError
{
    internal ServerError(string errorMessage) : base(500, errorMessage) { }

    public override string Title { get; init; } = "Server error exception.";

    public override string Type { get; init; } = "https://tools.ietf.org/html/rfc7231#section-6.6.1";
}
