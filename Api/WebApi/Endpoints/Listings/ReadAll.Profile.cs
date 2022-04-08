using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadAllProfile : Profile
{
    public ReadAllProfile()
    {
        CreateMap<ListingDtoModel, ReadAllResponse.Listing>();
        CreateMap<IEnumerable<ListingDtoModel>, ReadAllResponse>()
            .ForMember(dest => dest.Listings, opt => opt.MapFrom(src => src));
    }
}
