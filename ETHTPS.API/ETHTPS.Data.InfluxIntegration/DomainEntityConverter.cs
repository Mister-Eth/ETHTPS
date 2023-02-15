using InfluxDB.Client.Core.Flux.Domain;
using InfluxDB.Client.Writes;
using InfluxDB.Client;
using ETHTPS.Data.Core.Models.DataEntries;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    internal   /// <summary>
               /// Define Custom Domain Object Converter
               /// </summary>
         class DomainEntityConverter : IDomainObjectMapper
    {
        /// <summary>
        /// Convert to DomainObject.
        /// </summary>
        public object ConvertToEntity(FluxRecord fluxRecord, Type type)
        {
            if (type != typeof(Block))
            {
                throw new NotSupportedException($"This converter doesn't supports: {type}");
            }

            var customEntity = new Block
            {
                TransactionCount = Convert.ToInt32(fluxRecord.GetValueByKey("type")),
                BlockNumber = Convert.ToInt32(fluxRecord.GetValueByKey("transactioncount")),
                GasUsed = Convert.ToDouble(fluxRecord.GetValueByKey("gasused")),
                Provider = fluxRecord.GetValueByKey("provider").ToString() ?? "",
                Settled = Convert.ToBoolean(fluxRecord.GetValueByKey("settled")),
                Date = fluxRecord.GetTime().GetValueOrDefault().ToDateTimeUtc(),
            };

            return Convert.ChangeType(customEntity, type);
        }

        /// <summary>
        /// Convert to DomainObject.
        /// </summary>
        public T ConvertToEntity<T>(FluxRecord fluxRecord)
        {
            return (T)ConvertToEntity(fluxRecord, typeof(T));
        }

        public PointData ConvertToPointData<T>(T entity, InfluxDB.Client.Api.Domain.WritePrecision precision)
        {
            throw new NotImplementedException();
        }
    }

}
