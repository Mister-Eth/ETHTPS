using ETHTPS.Data.Database;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace ETHTPS.API.Infrastructure.Services
{
    public abstract class EFCoreCRUDServiceBase<TEntity> : ICRUDService<TEntity> where TEntity : EntityWIthId, new()
    {
        private readonly DbSet<TEntity> _entitySet;
        private readonly Action _saveChangesAction;
        private readonly object _lockObject;

        protected EFCoreCRUDServiceBase(DbSet<TEntity> entitySet, Action saveChangesAction, object lockObject)
        {
            _entitySet = entitySet;
            _saveChangesAction = saveChangesAction;
            _lockObject = lockObject;
        }

        public void Create(TEntity entity)
        {
            lock (_lockObject)
            {
                _entitySet.Add(entity);
                _saveChangesAction();
            }
        }

        public void DeleteById(int id)
        {
            lock (_lockObject)
            {
                var target = _entitySet.FirstOrDefault(e => e.Id == id);
                _entitySet.Remove(target);
                _saveChangesAction();
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            lock (_lockObject)
            {
                return _entitySet.ToList();
            }
        }

        public TEntity GetById(int id)
        {
            lock (_lockObject)
            {
                return _entitySet.FirstOrDefault(e => e.Id == id);
            }

        }
        public void Update(TEntity entity)
        {
            lock (_lockObject)
            {
                _entitySet.Update(entity);
                _saveChangesAction();
            }
        }
    }
}
