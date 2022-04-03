using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Errors;

public sealed class NotFoundError : BaseError
{
    internal NotFoundError(string errorMessage) : base(404, errorMessage) { }

    public override string Title { get; init; } = "Not found error.";

    public override string Type { get; init; } = "https://tools.ietf.org/html/rfc7231#section-6.5.4";
}