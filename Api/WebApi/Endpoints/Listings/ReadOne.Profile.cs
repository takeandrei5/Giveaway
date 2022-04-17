using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

namespace Giveaway.WebApi.Endpoints.Listings;

public class ReadOneProfile : Profile
{
    public ReadOneProfile() => CreateMap<ListingDtoModel, ReadOneResponse>()
        .ForMember(dest => dest.Listing, opt => opt.MapFrom(src => new ReadOneResponse.ListingDetails
        {
            Id = src.Id,
            Title = src.Title,
            Description = src.Description,
            Category = src.Category,
            CreatedAt = src.CreatedAt,
            Images = src.Images
        }))
        .ForMember(dest => dest.OwnerInfo, opt => opt.MapFrom(src => new ReadOneResponse.OwnerInformation
        {
            Email = src.OwnerEmail,
            Name = src.OwnerName,
            Image = src.OwnerImage
        }));
}
