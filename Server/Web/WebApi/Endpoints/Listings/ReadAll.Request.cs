using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed record ReadAllRequest
{
    [FromQuery]
    [DefaultValue(1)]
    public int PageNumber { get; init; } = 1;

    [FromQuery]
    [DefaultValue(10)]
    public int PageSize { get; init; } = 10;

    [FromQuery]
    [DefaultValue("Title ASC")]
    public string OrderBy { get; init; } = "Title ASC";

    [FromQuery]
    [DefaultValue(null)]
    public int? FilterByCategory { get; init; }
}
