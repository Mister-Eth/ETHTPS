using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.Extensions;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class DataUpdaterService : IDataUpdaterService
    {
        private readonly EthtpsContext _context;

        public DataUpdaterService(EthtpsContext context)
        {
            _context = context;
        }

        public IEnumerable<string> GetAllStatuses()
        {
            lock(_context.LockObj)
            {
                return _context.DataUpdaterStatuses.SafeSelect(x => x.Name);
            }
        }

        public LiveUpdaterStatus? GetStatusFor(string provider, string updaterType)
        {
            lock(_context.LockObj)
            {
                var result = _context.LiveDataUpdaterStatuses.FirstIfAny(x => x.Updater.Provider.Name == provider && x.Updater.Type.TypeName == updaterType);
                if (result == null)
                    return null;
                return Convert(result);
            }
        }

        public IEnumerable<LiveUpdaterStatus> GetStatusFor(string provider)
        {
            lock (_context.LockObj)
            {
                return _context.DataUpdaters.SafeWhere(x => x.Provider.Name == provider).SelectMany(result => result.LiveDataUpdaterStatuses.Select(y => Convert(y)));
            }
        }

        public void IncrementNumberOfFailures(string provider, string updaterType)
        {
            var updater = GetUpdater(provider, updaterType);
            lock (_context.LockObj)
            {
                var x = _context.LiveDataUpdaterStatuses.First(x => x.UpdaterId == updater.Id);
                x.NumberOfFailures++;
                _context.LiveDataUpdaterStatuses.Update(x);
                _context.SaveChanges();
            }
        }

        public void IncrementNumberOfSuccesses(string provider, string updaterType)
        {
            var updater = GetUpdater(provider, updaterType);
            lock (_context.LockObj)
            {
                var x = _context.LiveDataUpdaterStatuses.First(x => x.UpdaterId == updater.Id);
                x.NumberOfSuccesses++;
                _context.LiveDataUpdaterStatuses.Update(x);
                _context.SaveChanges();
            }
        }

        public void MarkAsRanSuccessfully(string provider, string updaterType)
        {
            SetStatusFor(provider, "Ran successfully", updaterType);
            IncrementNumberOfSuccesses(provider, updaterType);
        }

        public void SetStatusFor(string provider, string status, string updaterType)
        {
            var updater = GetUpdater(provider, updaterType);
            var s = GetStatus(status);
            lock (_context.LockObj)
            {
                if (!_context.LiveDataUpdaterStatuses.Any(x=>x.StatusId == s.Id && x.UpdaterId == updater.Id))
                {
                    _context.LiveDataUpdaterStatuses.Add(new LiveDataUpdaterStatus()
                    {
                        StatusId= s.Id,
                        UpdaterId= updater.Id,
                    });
                }
                else
                {
                    var x = _context.LiveDataUpdaterStatuses.First(x => x.StatusId == s.Id && x.UpdaterId == updater.Id);
                    x.StatusId= s.Id;
                    _context.LiveDataUpdaterStatuses.Update(x);
                }
                _context.SaveChanges();
            }
        }

        private DataUpdater GetUpdater(string provider, string updaterType)
        {
            CreateUpdaterIfNecessary(provider, updaterType);
            return _context.DataUpdaters.First(x => x.Type.TypeName == updaterType && x.Provider.Name == provider);
        }
        
        private DataUpdaterStatus GetStatus(string status)
        {
            CreateStatusIfNecessary(status);
            return _context.DataUpdaterStatuses.First(x => x.Name == status);
        }

        private void CreateStatusIfNecessary(string status)
        {
            lock (_context.LockObj)
            {
                if (!_context.DataUpdaterStatuses.Any(x=>x.Name == status))
                {
                    _context.DataUpdaterStatuses.Add(new DataUpdaterStatus()
                    {
                        Name = status,
                    });
                    _context.SaveChanges();
                }
            }
        }

        private void CreateUpdaterIfNecessary(string provider, string updaterType)
        {
            lock (_context.LockObj)
            {
                if (!_context.DataUpdaterTypes.Any(x=>x.TypeName == updaterType))
                {
                    _context.DataUpdaterTypes.Add(new DataUpdaterType()
                    {
                        TypeName = updaterType,
                    });
                    _context.SaveChanges();
                }

                if (!_context.DataUpdaters.Any(x => x.Provider.Name == provider && x.Type.TypeName == updaterType))
                {
                    var typeID = _context.DataUpdaterTypes.First(x => x.TypeName == updaterType).Id;
                    var providerID = _context.GetProviderID(provider);
                    _context.DataUpdaters.Add(new DataUpdater()
                    {
                        ProviderId = providerID,
                        TypeId = typeID
                    });
                    _context.SaveChanges();
                }
            }
        }

        private static LiveUpdaterStatus Convert(LiveDataUpdaterStatus result) => new()
            {
                LastSuccessfulRunTime = result.LastSuccessfulRunTime,
                NumberOfFailures = result.NumberOfFailures,
                NumberOfSuccesses = result.NumberOfSuccesses,
                Status = result.Status.Name,
                Updater = result.Updater.Provider.Name,
                UpdaterType = result.Updater.Type.TypeName
            };
        
    }
}
