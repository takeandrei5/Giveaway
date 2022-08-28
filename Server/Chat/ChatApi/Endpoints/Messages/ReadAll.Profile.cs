using AutoMapper;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail.Models;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

public sealed class ReadAllProfile : Profile
{
    public ReadAllProfile()
    {
        CreateMap<ConversationDtoModel.ConversationMessage, ReadAllResponse.ConversationMessage>();

        CreateMap<ConversationDtoModel, ReadAllResponse>()
           .ForMember(dest => dest.Conversation,
                opt => opt.MapFrom(src => src.Messages));
    }
}
