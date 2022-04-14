using Giveaway.Commons.Extra.Pagination;
using Giveaway.Database.Persistence.Entities;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<PaginatedResult<ListingEntity>, PaginatedResult<ReadAllListingsModel>>()
            .ForMember(dest => dest.Result, opt => opt.MapFrom(src => src.Result));

        CreateMap<ListingEntity, ReadAllListingsModel>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Images.Where(image => image.IsMainImage).First().Url));

        CreateMap<ListingEntity, ReadListingByIdModel>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(image => image.Url)))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.CategoryId));
    }
}
