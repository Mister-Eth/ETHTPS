using ETHTPS.Data.Core.Models.DataPoints;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart.Extensions
{
    public static class DataFormatExtensions
    {
        public static IDictionary<string, IEnumerable<DataResponseModel>> RemoveEmptyValues(this IDictionary<string, IEnumerable<DataResponseModel>> source)
        {
            foreach (var key in source.Keys)
            {
                if (!source[key].Any() || source[key].FirstOrDefault() == null)
                {
                    source.Remove(key);
                }
            }
            return source;
        }

        public static IDictionary<string, IEnumerable<DataResponseModel>> OrderEachSet(this IDictionary<string, IEnumerable<DataResponseModel>> source)
        {
            foreach (var key in source.Keys)
            {
                source[key] = source[key].OrderByDescending(x => x.Data.FirstOrDefault()?.Date);
            }
            return source;
        }

        public static IDictionary<string, IEnumerable<DataResponseModel>> TakeLatestN(this IDictionary<string, IEnumerable<DataResponseModel>> source, int count)
        {
            foreach (var key in source.Keys)
            {
                source[key] = source[key].TakeLast(count);
            }
            return source;
        }

        public static IEnumerable<IDictionary<string, DataPoint>> Flatten(this IDictionary<string, IEnumerable<DataResponseModel>> source)
        {
            List<Dictionary<string, DataPoint>> result = new();
            var maxLength = source.Keys.Select(x => source[x].Count()).Max
                ();
            for (int i = 0; i < maxLength; i++)
            {
                //Take smaller arrays and fill them up so they match length
                var temp = new Dictionary<string, DataPoint>();
                foreach (var key in source.Keys) //They're now all the same length
                {
                    if (source[key] != null)
                    {
                        if (source[key].ElementAtOrDefault(i) != null)
                        {
                            if (source[key].ElementAt(i).Data.Count() > 0)
                            {
                                if (source[key].ElementAt(i).Data.FirstOrDefault() != null)
                                {
                                    temp.Add(key, source[key].ElementAt(i).Data.First());
                                }
                            }
                        }
                    }
                }
                result.Add(temp);
            }
            return result;
        }
    }
}
