using System.ComponentModel.DataAnnotations;
using Giveaway.Commons.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class UpdateRequest
{
    [FromRoute(Name = "id")]
    public Guid Id { get; init; }

    [FromBody]
    public UpdateRequestDetails Details { get; init; } = null!;

    public sealed class UpdateRequestDetails
    {
        public string Title { get; init; } = null!;

        public string Description { get; init; } = null!;

        public IEnumerable<string> Images { get; init; } = null!;

        public int Category { get; init; }
    }
}
