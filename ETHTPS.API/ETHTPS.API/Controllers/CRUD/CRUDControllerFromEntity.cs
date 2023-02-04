using ETHTPS.API.Core.Infrastructure.Services;
using ETHTPS.Data.Database;
using ETHTPS.Data.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;

namespace ETHTPS.API.Controllers.CRUD
{
    public class CRUDControllerFromEntity<TEntity> : EFCoreCRUDServiceBase<TEntity>, ICRUDController<TEntity>
         where TEntity : EntityWIthId, new()
    {
        public CRUDControllerFromEntity(EthtpsContext context, Func<EthtpsContext, DbSet<TEntity>> setSelector) : base(setSelector(context), context)
        {
        }

        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void Create(TEntity entity, APIKeyRequestModel requestModel) => base.Create(entity);
        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void DeleteById(int id, APIKeyRequestModel requestModel) => base.DeleteById(id);
        [Route("[action]")]
        [HttpGet]
        public IEnumerable<TEntity> GetAll(APIKeyRequestModel requestModel) => base.GetAll();
        [HttpGet]
        [Route("[action]")]
        public TEntity GetById(int id, APIKeyRequestModel requestModel) => base.GetById(id);
        [Route("[action]")]
        [Authorize(Policy = "EditorsOnly")]
        [HttpPut]
        public void Update(TEntity entity, APIKeyRequestModel requestModel) => base.Update(entity);
    }
}
