using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Commons.Extensions;

public static class AutoMapperExtensions
{
    public static TResult MergeInto<TResult>(this IMapper mapper, object item1, object item2) =>
        mapper.Map(item2, mapper.Map<TResult>(item1));
}
