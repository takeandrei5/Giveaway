using AutoMapper;
using Giveaway.Commons.Extra.Pagination;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class ReadAllProfile : Profile
{
    public ReadAllProfile()
    {
        // Request
        CreateMap<ReadAllRequest, ListPagedQuery>();

        // Response
        CreateMap<PaginatedResult<ListingDtoModel>, ReadAllResponse>()
            .ForMember(dest => dest.Listings, opt => opt.MapFrom(src => src));

        CreateMap<PaginatedResult<ListingDtoModel>, PaginatedResult<ReadAllResponse.Listing>>()
            .ForMember(dest => dest.Result, opt => opt.MapFrom(src => src.Result));

        CreateMap<ListingDtoModel, ReadAllResponse.Listing>();
    }
}
