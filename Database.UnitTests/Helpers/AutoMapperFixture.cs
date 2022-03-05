using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.UnitTests.Helpers;

public class AutoMapperFixture
{
    protected AutoMapperFixture()
    {
        var assemblies = AppDomain.CurrentDomain
            .GetAssemblies()
            .Where(x => !string.IsNullOrEmpty(x.FullName) && x.FullName.Contains("Giveaway") && !x.FullName.Contains("UnitTests"))
            .ToList();
        Mapper = new MapperConfiguration(cfg => cfg.AddMaps(assemblies)).CreateMapper();
    }

    protected IMapper Mapper { get; private set; }
}
