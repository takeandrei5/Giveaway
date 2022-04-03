using Giveaway.Database.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingReadModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingReadModel;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

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
