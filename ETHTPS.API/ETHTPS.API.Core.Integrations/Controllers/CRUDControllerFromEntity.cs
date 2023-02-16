using ETHTPS.API.Core.Controllers.CRUD;
using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data.Core;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ETHTPS.API.Core.Integrations.MSSQL.Controllers.CRUD
{
    public class CRUDControllerFromEntity<TEntity> : EFCoreCRUDServiceBase<TEntity>, ICRUDController<TEntity>
         where TEntity : class, IIndexed
    {
        public CRUDControllerFromEntity(EthtpsContext context, Func<EthtpsContext, DbSet<TEntity>> setSelector) : base(setSelector(context), context)
        {
        }

        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void Create(TEntity entity) => Create(entity);
        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void DeleteById(int id) => DeleteById(id);
        [Route("[action]")]
        [HttpGet]
        public new IEnumerable<TEntity> GetAll() => base.GetAll();
        [HttpGet]
        [Route("[action]")]
        public TEntity GetById(int id) => GetById(id);
        [Route("[action]")]
        [Authorize(Policy = "EditorsOnly")]
        [HttpPut]
        public void Update(TEntity entity) => Update(entity);
    }
}
