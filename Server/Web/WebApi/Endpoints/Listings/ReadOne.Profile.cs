using AutoMapper;
using Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class ReadOneProfile : Profile
{
    public ReadOneProfile() => CreateMap<ListingDtoModel, ReadOneResponse>()
        .ForMember(dest => dest.ListingInfo, opt => opt.MapFrom(src => new ReadOneResponse.ListingInformation
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
