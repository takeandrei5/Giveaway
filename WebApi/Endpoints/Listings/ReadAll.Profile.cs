using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadAllProfile : Profile
{
    public ReadAllProfile()
    {
        CreateMap<IEnumerable<ListingDtoModel>, ReadAllResponse>();
        CreateMap<ListingDtoModel, ReadAllResponse.Listing>();
    }
}
