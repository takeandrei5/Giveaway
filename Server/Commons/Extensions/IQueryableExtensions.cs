using System.Linq.Expressions;

namespace Giveaway.Commons.Extensions;

public static class IQueryableExtensions
{
    public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string orderBy)
    {
        if (source is null)
            throw new ArgumentNullException(nameof(source));

        if (orderBy is null)
            throw new ArgumentNullException(nameof(orderBy));

        var tSplit = orderBy.Split(' ');

        if (tSplit.Length > 2)
            throw new ArgumentException("Received invalid number of values");

        var field = tSplit[0];
        var direction = tSplit.Length == 2
            ? tSplit[1]
            : "ASC";

        var parameter = Expression.Parameter(typeof(T));
        var memberExpression = Expression.PropertyOrField(parameter, field);
        var command = direction == "DESC"
            ? nameof(Queryable.OrderByDescending)
            : nameof(Queryable.OrderBy);

        var orderByExpression = Expression.Lambda(memberExpression, parameter);

        var resultExpression = Expression.Call(typeof(Queryable), command,
            new[]
            {
                parameter.Type,
                orderByExpression.ReturnType
            },
            source.Expression, Expression.Quote(orderByExpression));

        return source.Provider.CreateQuery<T>(resultExpression);
    }
}