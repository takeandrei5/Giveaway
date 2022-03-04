using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Extensions;

public static class RangeExtensions
{
    public static IEnumerator<int> GetEnumerator(this Range range)
    {
        if (range.Start.IsFromEnd)
            for (var i = range.Start.Value; i >= range.End.Value; i--)
                yield return i;
        else
            for (var i = range.Start.Value; i <= range.End.Value; i++)
                yield return i;
    }
}
