using Giveaway.Database.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.ReadListingById.Models.ListingReadModel;

namespace Giveaway.Database.DataAccess.ListingDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<ListingEntity, ReadAllListingsModel>();

        CreateMap<ListingEntity, ReadListingByIdModel>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(image => image.Url)))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
    }
}
