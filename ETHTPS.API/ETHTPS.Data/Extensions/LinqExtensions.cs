using System;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Extensions
{
    public static class LinqExtensions
    {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
    (this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }

        public static IEnumerable<T> Where2<T>(this IEnumerable<T> source, Func<T, int> predicate) => Enumerable.Where(source, x => predicate(x) == 1);

        //public static IEnumerable<T> Where<T>(this IEnumerable<T> source, Func<T, bool> predicate) => source;

        public static T FirstIfAny<T>(this IEnumerable<T> source, Func<T, bool> selector)
        {
            if (source == null || !source.Any())
                return default(T);

            if (source.Any(selector))
            {
                return source.First(selector);
            }
            return default(T);
        }

        /// <summary>
        /// A variant of <see cref="System.Linq.Enumerable.Where{TSource}(IEnumerable{TSource}, Func{TSource, bool})"/> that returns an empty array instead of throwing an exception when the search clause finds no results or the source is null.
        /// </summary>
        public static IEnumerable<T> SafeWhere<T>(this IEnumerable<T> source, Func<T,bool> predicate)
        {
            if (source == null || !source.Any(predicate))
                return Enumerable.Empty<T>();

            return source.Where(predicate);
        }

        /// <summary>
        /// A variant of <see cref="System.Linq.Enumerable.Select{TSource, TResult}(IEnumerable{TSource}, Func{TSource, int, TResult}){TSource}(IEnumerable{TSource}, Func{TSource, bool})"/> that returns an empty array instead of throwing an exception when the search clause finds no results or the source is null.
        /// </summary>
        public static IEnumerable<TReturn> SafeSelect<T, TReturn>(this IEnumerable<T> source, Func<T, TReturn> selector)
        {
            if (source == null || !source.Any())
                return Enumerable.Empty<TReturn>();

            return source.Select(selector);
        }
    }
}
