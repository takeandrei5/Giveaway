using Giveaway.Commons.Extra.Pagination;
using Giveaway.Web.Database.Persistence.Entities;
using ReadAllListingsModel = Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Web.Database.DataAccess.ListingDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<PaginatedResult<ListingEntity>, PaginatedResult<ReadAllListingsModel>>()
            .ForMember(dest => dest.Result, opt => opt.MapFrom(src => src.Result));

        CreateMap<ListingEntity, ReadAllListingsModel>()
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Images.Where(image => image.Index == 1).First().Url));

        CreateMap<ListingEntity, ReadListingByIdModel>()
            .ForMember(dest => dest.Images, opt =>
                opt.MapFrom(src =>
                    src.Images.OrderBy(image => image.Index)
                        .Select(image => image.Url)))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.CategoryId))
            .ForMember(dest => dest.OwnerEmail, opt => opt.MapFrom(src => src.Owner.Email))
            .ForMember(dest => dest.OwnerName, opt => opt.MapFrom(src => src.Owner.Name))
            .ForMember(dest => dest.OwnerImage, opt => opt.MapFrom(src => src.Owner.Image));
    }
}
