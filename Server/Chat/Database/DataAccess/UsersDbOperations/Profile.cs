using Giveaway.Chat.Database.Persistence.Entities;
using Giveaway.Chat.Domain.Users;

namespace Giveaway.Chat.Database.DataAccess.UsersDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<UserInformation, UserEntity>()
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email.Value))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.Value))
           .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image.Value));

        CreateMap<UserEntity, UserInformation>()
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => new UserEmail(src.Email)))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => new UserName(src.Name)))
           .ForMember(dest => dest.Image, opt => opt.MapFrom(src => new UserImage(src.Image)));
    }
}
