using AutoMapper;

namespace Helpers;

public class AutoMapperFixture
{
    protected AutoMapperFixture(string assemblyName) =>
        Mapper = new MapperConfiguration(cfg => cfg.AddMaps(assemblyName)).CreateMapper();

    protected IMapper Mapper { get; }
}
