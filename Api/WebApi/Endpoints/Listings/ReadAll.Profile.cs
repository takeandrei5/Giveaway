using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadAllProfile : Profile
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
