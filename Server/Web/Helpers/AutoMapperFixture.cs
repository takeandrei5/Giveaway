using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Helpers;

public class AutoMapperFixture
{
    protected AutoMapperFixture()
    {
        var assemblies = new List<Assembly>
        {
            // Chat
            Assembly.Load("Giveaway.Chat.ChatApi"),
            
            // Web
            Assembly.Load("Giveaway.Web.Application"),
            Assembly.Load("Giveaway.Web.Domain"),
            Assembly.Load("Giveaway.Web.WebApi"),
        };
        
        Mapper = new MapperConfiguration(cfg => cfg.AddMaps(assemblies)).CreateMapper();
    }

    protected IMapper Mapper { get; }
}
