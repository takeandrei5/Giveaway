using Giveaway.Database.Persistence.Entities;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<ListingEntity, ReadAllListingsModel>()
            .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.First().Url));

        CreateMap<ListingEntity, ReadListingByIdModel>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(image => image.Url)))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.CategoryId));
    }
}
