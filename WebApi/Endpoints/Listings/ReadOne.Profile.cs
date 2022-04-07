using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadOneProfile : Profile
{
    public ReadOneProfile()
    {
        CreateMap<ListingDtoModel.Image, ReadOneResponse.Image>();

        CreateMap<ListingDtoModel, ReadOneResponse>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images));
    }
}
