using AutoMapper;
using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages.Models;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

public sealed class ReadAllProfile : Profile
{
    public ReadAllProfile()
    {
        CreateMap<IEnumerable<ConversationDtoModel>, ReadAllResponse>()
           .ForMember(dest => dest.Conversation,
                opt => opt.MapFrom(src => src));

        CreateMap<ConversationDtoModel.ConversationMessage, ReadAllResponse.ConversationMessage>();
    }
}
