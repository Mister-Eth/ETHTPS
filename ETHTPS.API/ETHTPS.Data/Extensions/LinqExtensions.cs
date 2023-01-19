﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Extensions
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

        public static IEnumerable<T> Where2<T>(this IEnumerable<T> source, Func<T, int> predicate) => source.Where(x => predicate(x) == 1);

        public static IEnumerable<T> Where2<T>(this IEnumerable<T> source, Func<T, bool> predicate) => source.Where(x => predicate(x));

        public static T FirstIfAny<T>(this IEnumerable<T> source, Func<T, bool> selector)
        {
            if (source.Any(selector))
            {
                return source.First(selector);
            }
            else
            {
                return default;
            }
        }
    }
}
