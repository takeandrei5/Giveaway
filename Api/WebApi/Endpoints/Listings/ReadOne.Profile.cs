using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadOneProfile : Profile
{
    public ReadOneProfile() => CreateMap<ListingDtoModel, ReadOneResponse>();
}
