using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed record ReadAllRequest
{
    [FromQuery]
    [DefaultValue(1)]
    public int PageNumber { get; init; } = 1;

    [FromQuery]
    [DefaultValue(10)]
    public int PageSize { get; init; } = 10;

    [FromQuery]
    [DefaultValue("Title")]
    public string OrderBy { get; init; } = "Title";

    [FromQuery]
    [DefaultValue(null)]
    public int? FilterByCategory { get; init; }
}
