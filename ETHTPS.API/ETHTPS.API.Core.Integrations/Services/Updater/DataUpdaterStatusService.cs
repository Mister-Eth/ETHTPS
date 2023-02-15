using ETHTPS.Data.Core.Models.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.Extensions;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services.Updater
{
    public class DataUpdaterStatusService : IDataUpdaterStatusService
    {
        private readonly EthtpsContext _context;

        public DataUpdaterStatusService(EthtpsContext context)
        {
            _context = context;
        }

        public IEnumerable<LiveUpdaterStatus> GetAllStatuses()
        {
            lock (_context.LockObj)
            {
                return _context.LiveDataUpdaterStatuses.SafeSelect(x => Convert(x));
            }
        }

        public LiveUpdaterStatus? GetStatusFor(string provider, UpdaterType updaterType)
        {
            lock (_context.LockObj)
            {
                var result = _context.LiveDataUpdaterStatuses.FirstIfAny(x => x.Updater.Provider.Name == provider && x.Updater.Type.TypeName == updaterType.ToString());
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

        public void IncrementNumberOfFailures(string provider, UpdaterType updaterType)
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

        public void IncrementNumberOfSuccesses(string provider, UpdaterType updaterType)
        {
            var updater = GetUpdater(provider, updaterType);
            lock (_context.LockObj)
            {
                var x = _context.LiveDataUpdaterStatuses.First(x => x.UpdaterId == updater.Id);
                x.NumberOfSuccesses++;
                x.LastSuccessfulRunTime = DateTime.Now;
                _context.LiveDataUpdaterStatuses.Update(x);
                _context.SaveChanges();
            }
        }

        public void MarkAsRanSuccessfully(string provider, UpdaterType updaterType)
        {
            SetStatusFor(provider, updaterType, UpdaterStatus.RanSuccessfully);
            IncrementNumberOfSuccesses(provider, updaterType);
        }

        public void MarkAsFailed(string provider, UpdaterType updaterType)
        {
            SetStatusFor(provider, updaterType, UpdaterStatus.Failed);
            IncrementNumberOfFailures(provider, updaterType);
        }

        public void SetStatusFor(string provider, UpdaterType updaterType, UpdaterStatus status)
        {
            var updater = GetUpdater(provider, updaterType);
            var s = GetStatus(status);
            lock (_context.LockObj)
            {
                if (!_context.LiveDataUpdaterStatuses.Any(x => x.UpdaterId == updater.Id))
                {
                    _context.LiveDataUpdaterStatuses.Add(new LiveDataUpdaterStatus()
                    {
                        StatusId = s.Id,
                        UpdaterId = updater.Id,
                    });
                    _context.SaveChanges();
                }

                var x = _context.LiveDataUpdaterStatuses.First(x => x.UpdaterId == updater.Id);
                x.StatusId = s.Id;
                if (status == UpdaterStatus.Running)
                    x.LastRunTime = DateTime.Now;
                _context.Update(x);
                _context.SaveChanges();
            }
        }

        private DataUpdater GetUpdater(string provider, UpdaterType updaterType)
        {
            CreateUpdaterIfNecessary(provider, updaterType);
            lock (_context.LockObj)
            {
                return _context.DataUpdaters.First(x => x.Type.TypeName == updaterType.ToString() && x.Provider.Name == provider);
            }
        }
        private DataUpdaterStatus GetStatus(UpdaterStatus status) => GetStatus(status.ToString());
        private DataUpdaterStatus GetStatus(string status)
        {
            CreateStatusIfNecessary(status);
            lock (_context.LockObj)
            {
                return _context.DataUpdaterStatuses.First(x => x.Name == status);
            }
        }

        private void CreateStatusIfNecessary(string status)
        {
            lock (_context.LockObj)
            {
                if (!_context.DataUpdaterStatuses.Any(x => x.Name == status))
                {
                    _context.DataUpdaterStatuses.Add(new DataUpdaterStatus()
                    {
                        Name = status,
                    });
                    _context.SaveChanges();
                }
            }
        }

        private void CreateUpdaterIfNecessary(string provider, UpdaterType updaterType)
        {
            lock (_context.LockObj)
            {
                if (!_context.DataUpdaterTypes.Any(x => x.TypeName == updaterType.ToString()))
                {
                    _context.DataUpdaterTypes.Add(new DataUpdaterType()
                    {
                        TypeName = updaterType.ToString(),
                    });
                    _context.SaveChanges();
                }

                if (!_context.DataUpdaters.Any(x => x.Provider.Name == provider && x.Type.TypeName == updaterType.ToString()))
                {
                    var typeID = _context.DataUpdaterTypes.First(x => x.TypeName == updaterType.ToString()).Id;
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

        public void MarkAsRunning(string provider, UpdaterType updaterType) => SetStatusFor(provider, updaterType, UpdaterStatus.Running);

        public IProviderDataUpdaterStatusService MakeProviderSpecific(string provider) => ProviderDataUpdaterStatusService.From(this, provider);

        public DateTime? GetLastRunTimeFor(string provider, UpdaterType updaterType)
        {
            var info = GetStatusFor(provider, updaterType);
            return info?.LastSuccessfulRunTime;
        }
    }
}
