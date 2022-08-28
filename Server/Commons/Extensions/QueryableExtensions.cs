using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Giveaway.Commons.Extensions;

public static class QueryableExtensions
{
    private static readonly Regex _orderByRegex =
        new("^[A-Za-z1-9]+ (ASC|DESC)$", RegexOptions.Compiled, TimeSpan.FromMilliseconds(250));

    public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string orderBy) where T : class
    {
        if (source is null)
            throw new ArgumentNullException(nameof(source));

        if (string.IsNullOrWhiteSpace(orderBy))
            throw new ArgumentNullException(nameof(orderBy));

        if (!_orderByRegex.IsMatch(orderBy))
            throw new ArgumentException("OrderBy parameter doesn't match regex rules.");
        
        var tSplit = orderBy.Split(' ');

        var field = tSplit[0];
        var direction = tSplit[1];

        var parameter = Expression.Parameter(typeof(T));
        var memberExpression = Expression.PropertyOrField(parameter, field);
        var command = direction == "DESC"
            ? nameof(Queryable.OrderByDescending)
            : nameof(Queryable.OrderBy);

        var orderByExpression = Expression.Lambda(memberExpression, parameter);

        var resultExpression = Expression.Call(typeof(Queryable),
            command,
            new[]
            {
                parameter.Type,
                orderByExpression.ReturnType
            },
            source.Expression,
            Expression.Quote(orderByExpression));

        return source.Provider.CreateQuery<T>(resultExpression);
    }
}
